// @lighthouserc.js
module.exports = {
    ci: {
        collect: {
            staticDistDir: './dist',
            url: ['http://localhost:3000'],
            numberOfRuns: 5
        },
        assert: {
            assertions: {
                'categories:performance': ['warn', { minScore: 0.7 }],
                'categories:accessibility': ['warn', { minScore: 0.7 }],
                'categories:seo': ['warn', { minScore: 0.7 }],
                'categories:best-practices': ['warn', { minScore: 0.7 }],
                'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
                'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
                'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }]
            }
        },
        upload: {
            target: 'filesystem',
            outputDir: './lhci_reports',
            reportFilenamePattern:
                '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%'
        },
        server: {
            port: 9000
        }
    }
};
