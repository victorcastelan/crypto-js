YUI.add('sha256-benchmark', function (Y) {
    Y.CryptoJSTestSuite.add(new Y.Test.Case({
        name: 'SHA256',

        testBenchmark: function () {
            var suite = new Benchmark.Suite();

            suite.add('CryptoJS 4', function () {
                var hash = CryptoJS.SHA256.hash('abc') + '';
            });

            suite.add('CryptoJS 3', function () {
                var hash = Y.CryptoJS3.SHA256('abc') + '';
            });

            suite.add('CryptoJS 2', function () {
                var hash = Y.CryptoJS2.SHA256('abc') + '';
            });

            suite.add('Paj', function () {
                var hash = Y.PajSHA256('abc') + '';
            });

            suite.add('sjcl', function () {
                var hash = Y.Sjcl.codec.hex.fromBits(Y.Sjcl.hash.sha256.hash('abc')) + '';
            });

            suite.on('cycle', function (e) {
                Y.log(e.target, 'info', 'TestRunner');
            });

            suite.on('complete', (function (testCase) {
                return function () {
                    testCase.resume(function () {
                        Y.Assert.areEqual('CryptoJS 4', suite.filter('fastest').pluck('name'));
                    });
                }
            }(this)));

            suite.run({ async: true });

            this.wait(1000000);
        }
    }));
}, '$Rev$');