VK.init({
    apiId: 6774641
});

const vk = document.querySelector('.vk');

vk.addEventListener('click', () => {
    function auth() {
        return new Promise((resolve, reject) => {
            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                    console.log('ок')
                } else {
                    reject();
                    console.error(new Error('не удалось авторизоваться'))
                }
            }, 2);

        })
    }

    function call(method, params) {
        params.v = '5.92';
        return new Promise((resolve, reject) => {

            VK.api(method, params, (dataSet) => {
                if (dataSet.error) {
                    reject(dataSet.error);
                } else {
                    resolve(dataSet.response)
                }
            })
        })
    }

    (async() => {
        await auth();
        const [me] = await call('users.get', {'name_case': 'gen'});
        console.log(me.first_name);
        const text = document.querySelector('.text');
        text.innerHTML = 'Друзья'+' '+me.first_name;
        const friends = await call('friends.get', {fields: 'city, country, photo_100, domain'});
        const temp = document.querySelector('#address-template').textContent;
        const render = Handlebars.compile(temp);
        const html = render(friends);
        const result = document.querySelector('.result');
        result.innerHTML = html;
    })()
});
