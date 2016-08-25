import os
import subprocess as sp

sp.call('echo "***** Installing node server... *****"', shell=True)
sp.call('npm install', shell=True)
sp.call('echo "***** FINISHED installing node server *****"', shell=True)
os.chdir('app')
sp.call('echo "***** Installing client modules... *****"', shell=True)
sp.call('npm install', shell=True)
sp.call('echo "***** FINISHED installing client modules *****"', shell=True)
sp.call('echo "***** Installing bower components... *****"', shell=True)
sp.call('bower install', shell=True)
sp.call('echo "***** FINISHED installing bower components *****"', shell=True)