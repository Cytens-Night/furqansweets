param(
    [int]$Port = 8000
)

$root = $PSScriptRoot
if (-not $root) { $root = (Get-Location).Path }
$rootPath = [System.IO.Path]::GetFullPath($root).TrimEnd('\', '/')
$dataPath = [System.IO.Path]::Combine($rootPath, "data.json")

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)

try {
    $listener.Start()
} catch {
    Write-Host "Failed to start server on port $Port : $_" -ForegroundColor Red
    exit 1
}

Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Furqan Sweets Local Web Server & CRM Backend Running! " -ForegroundColor Green
Write-Host "   Local URL: $prefix                           " -ForegroundColor Yellow
Write-Host "   Admin CRM: ${prefix}access (/access.html)       " -ForegroundColor Yellow
Write-Host "   Press Ctrl+C to stop the server.                     " -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$mimeTypes = @{
    ".html"  = "text/html; charset=utf-8"
    ".css"   = "text/css; charset=utf-8"
    ".js"    = "application/javascript; charset=utf-8"
    ".svg"   = "image/svg+xml"
    ".png"   = "image/png"
    ".jpg"   = "image/jpeg"
    ".jpeg"  = "image/jpeg"
    ".gif"   = "image/gif"
    ".ico"   = "image/x-icon"
    ".wav"   = "audio/wav"
    ".mp3"   = "audio/mpeg"
    ".json"  = "application/json; charset=utf-8"
    ".woff"  = "font/woff"
    ".woff2" = "font/woff2"
    ".ttf"   = "font/ttf"
}

function Send-JsonResponse($response, [int]$statusCode, $dataObj) {
    $response.StatusCode = $statusCode
    $response.ContentType = "application/json; charset=utf-8"
    $jsonText = $dataObj | ConvertTo-Json -Depth 10
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonText)
    $response.ContentLength64 = $bytes.Length
    $response.OutputStream.Write($bytes, 0, $bytes.Length)
    $response.Close()
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # CORS Headers
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.Close()
            continue
        }

        $urlPath = [System.Uri]::UnescapeDataString($request.Url.AbsolutePath)
        if ($urlPath -eq "/" -or $urlPath -eq "") {
            $urlPath = "/index.html"
        } elseif ($urlPath -eq "/access" -or $urlPath -eq "/access/") {
            $urlPath = "/access.html"
        }

        # API: GET /api/data
        if ($urlPath -eq "/api/data" -and $request.HttpMethod -eq "GET") {
            if ([System.IO.File]::Exists($dataPath)) {
                $jsonContent = [System.IO.File]::ReadAllText($dataPath, [System.Text.Encoding]::UTF8)
                $response.StatusCode = 200
                $response.ContentType = "application/json; charset=utf-8"
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonContent)
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                $response.Close()
                Write-Host "200 GET /api/data" -ForegroundColor Green
            } else {
                Send-JsonResponse $response 404 @{ error = "data.json not found" }
                Write-Host "404 GET /api/data" -ForegroundColor Red
            }
            continue
        }

        # API: POST /api/data
        if ($urlPath -eq "/api/data" -and ($request.HttpMethod -eq "POST" -or $request.HttpMethod -eq "PUT")) {
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $bodyText = $reader.ReadToEnd()
                $reader.Close()

                # Validate JSON syntax
                $testJson = $bodyText | ConvertFrom-Json
                # Save formatted JSON to file
                $formattedJson = $testJson | ConvertTo-Json -Depth 20
                [System.IO.File]::WriteAllText($dataPath, $formattedJson, [System.Text.Encoding]::UTF8)

                Send-JsonResponse $response 200 @{ success = $true; message = "Store data updated successfully!" }
                Write-Host "200 POST /api/data - Updated data.json" -ForegroundColor Cyan
            } catch {
                Send-JsonResponse $response 400 @{ success = $false; error = "Invalid JSON or save error: $_" }
                Write-Host "400 POST /api/data - Error: $_" -ForegroundColor Red
            }
            continue
        }

        # API: POST /api/upload
        if ($urlPath -eq "/api/upload" -and $request.HttpMethod -eq "POST") {
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $bodyText = $reader.ReadToEnd()
                $reader.Close()

                $payload = $bodyText | ConvertFrom-Json
                $filename = $payload.filename
                $base64 = $payload.base64

                if (-not $filename -or -not $base64) {
                    Send-JsonResponse $response 400 @{ success = $false; error = "filename and base64 required" }
                    continue
                }

                $cleanName = [System.IO.Path]::GetFileName($filename) -replace '[^a-zA-Z0-9\._-]', '_'
                $assetsDir = [System.IO.Path]::Combine($rootPath, "assets")
                if (-not [System.IO.Directory]::Exists($assetsDir)) {
                    [System.IO.Directory]::CreateDirectory($assetsDir) | Out-Null
                }

                $targetFilePath = [System.IO.Path]::Combine($assetsDir, $cleanName)

                $b64Data = $base64 -replace '^data:image\/[a-zA-Z0-9\+\-\.]+;base64,', ''
                $bytes = [System.Convert]::FromBase64String($b64Data)
                [System.IO.File]::WriteAllBytes($targetFilePath, $bytes)

                $relativePath = "assets/$cleanName"
                Send-JsonResponse $response 200 @{ success = $true; path = $relativePath; message = "Image uploaded successfully!" }
                Write-Host "200 POST /api/upload -> $relativePath" -ForegroundColor Cyan
            } catch {
                Send-JsonResponse $response 500 @{ success = $false; error = "Upload failed: $_" }
                Write-Host "500 POST /api/upload - Error: $_" -ForegroundColor Red
            }
            continue
        }

        # Static File Serving
        $relativePath = $urlPath.TrimStart('/', '\')
        $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($rootPath, $relativePath))

        if (-not $filePath.StartsWith($rootPath, [System.StringComparison]::OrdinalIgnoreCase)) {
            $response.StatusCode = 403
            $msg = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden")
            $response.OutputStream.Write($msg, 0, $msg.Length)
            $response.Close()
            continue
        }

        if ([System.IO.Directory]::Exists($filePath)) {
            $filePath = [System.IO.Path]::Combine($filePath, "index.html")
        }

        if ([System.IO.File]::Exists($filePath)) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "application/octet-stream"
            if ($mimeTypes.ContainsKey($ext)) {
                $contentType = $mimeTypes[$ext]
            }

            $response.ContentType = $contentType
            $response.StatusCode = 200

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "200 GET $urlPath" -ForegroundColor Green
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            Write-Host "404 GET $urlPath" -ForegroundColor Red
        }
        $response.Close()
    } catch {
        if ($listener.IsListening) {
            Write-Host "Error serving request: $_" -ForegroundColor Red
        }
    }
}
