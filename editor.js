var selfArchive = ''
var state = ''
var commitCounter = 0

function initializeSaving() {
  if (window.hasOwnProperty('DatArchive')) {
    selfArchive = new DatArchive('' + window.location)
    state = (document.getElementById('archiveDoc')).outerHTML
    commitCounter = 0
  }
}

async function save() {
  // Check if state is stale.
  if (state !== (document.getElementById('archiveDoc')).outerHTML) {
    state = (document.getElementById('archiveDoc')).outerHTML
    await selfArchive.writeFile('/index.html', '<!DOCTYPE html>' + state, 'utf8')
    console.log('wrote to disk')
    await selfArchive.commit()
    console.log('committed to archive')
    commitCounter++
    console.log('commit count: ' + commitCounter)
  }
}

