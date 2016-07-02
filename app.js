requirejs.config({
    "baseUrl": "http://el/lib",
    "map": {
        '*': { 'jquery': 'jquery-private' },
        'jquery-private': { 'jquery': 'jquery' }
    },
    "paths": {
        'app': 'http://el/app',
        'jquery': 'https://code.jquery.com/jquery-git.min',
        'notify': 'https://rawgit.com/notifyjs/notifyjs/master/dist/notify',
    },
    "shim": {
        'remover': 'remover',
    },
});

requirejs(["app/main"]);
