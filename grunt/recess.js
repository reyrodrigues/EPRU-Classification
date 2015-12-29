module.exports = {
    less: {
        files: [
            {
                expand: true,            // Enable dynamic expansion.
                cwd: 'angular/src/css/less/',     // Src matches are relative to this path.
                src: ['app.less', 'md.less'],         // Actual pattern(s) to match.
                dest: 'angular/src/css/',    // Destination path prefix.
                ext: '.css'
            }
        ],
        options: {
          compile: true
        }
    }
}
