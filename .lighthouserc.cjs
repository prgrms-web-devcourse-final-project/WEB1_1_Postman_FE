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
                'categories:best-practices': ['warn', { minScore: 0.7 }]
            }
        },
        upload: {
            target: 'temporary-public-storage'
        },
        server: {
            port: 9000
        }
    }
};
