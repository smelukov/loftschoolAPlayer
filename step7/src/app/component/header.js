define('app/component/header', ['app/component', 'view'], (Component, view) => {
    return class extends Component {
        async render(data) {
            return view.renderTo(headerInfo, 'me', {text: data});
        }
    };
});
