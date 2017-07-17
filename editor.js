var selfArchive = ''
var state = ''
var commitCounter = 0

function initializeSaving() {
  if (window.hasOwnProperty('DatArchive')) {
    selfArchive = new DatArchive('' + window.location)
    state = (document.getElementById('content')).outerHTML
    commitCounter = 0
    saveIt()
  }
}

async function saveIt() {
  // Check if state is stale.
  if (state !== (document.getElementById('content')).outerHTML) {
    state = (document.getElementById('content')).outerHTML
    await selfArchive.writeFile('/index.html', topTemplate + state + bottomTemplate, 'utf8')
    console.log('wrote to disk')
    await selfArchive.commit()
    console.log('committed to archive')
    commitCounter++
    console.log('commit count: ' + commitCounter)
  }
  // Debounce as to not overload network on very fast key strokes.
  setTimeout(saveIt, 5000)
}

var topTemplate = `
<!DOCTYPE html>
<html id="content">
    <head>
        <meta charset="utf-8">
        <title>A Simple Page with CKEditor</title>
        <!-- Make sure the path to CKEditor is correct. -->
        <script src="bower_components/ckeditor/ckeditor.js"></script>
        <script src="editor.js"></script>
    </head>
    <body onload="initializeSaving()">`;

var bottomTemplate = `
    </body>
</html>
`
