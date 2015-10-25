var mathboxDOM = function (tagName, props, ...contents) {
    if (tagName === 'root') {
        var result = mathbox;

        if (props !== null) {
            for (var key in props) {
                if (props.hasOwnProperty(key)) {
                    result.set(key, props[key]);
                }
            }
        }
        
        contents.forEach(function (createElement) {
            result = createElement(result);
        });

        return result;
    } else {

        return function (parent) {
            var result;
            var staticProps = [];
            var dynamicProps = [];
            if (props !== null) {
                for (var key in props) {
                    if (props.hasOwnProperty(key)) {
                        if(key.slice(0,7) === 'dynamic'){
                            dynamicProps[key.slice(7)] = props[key];
                        } else {
                            staticProps[key] = props[key];
                        }
                    }
                }
            }
            
            result = parent[tagName](staticProps, dynamicProps);
            contents.forEach(function (createElement) {
                result = createElement(result);
            });
            return result;
        };
    }
};