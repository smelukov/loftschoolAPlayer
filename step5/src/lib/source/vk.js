define('lib/source/vk', ['lib/source', 'vk'], Source => {
    return class extends Source {
        constructor(apiId, perms, version = '5.50') {
            super();

            this.apiId = apiId;
            this.perms = perms;
            this.version = version;
        }

        login() {
            if (!this.initedId != this.apiId) {
                VK.init({
                    apiId: this.apiId
                });

                this.initedId = this.apiId;
            }

            return new Promise((resolve, reject)=> {
                VK.Auth.getLoginStatus((response)=> {
                    if (response.status === 'connected') {
                        resolve(response);
                    } else {
                        reject(new Error('Не авторизован'));
                    }
                });
            }).catch(()=> {
                return new Promise((resolve, reject)=> {
                    VK.Auth.login((response)=> {
                        if (response.session) {
                            resolve(response);
                        } else {
                            reject(new Error('Не удалось авторизоваться'));
                        }
                    }, this.perms);
                });
            });
        }

        callApi(method, params) {
            return this.login().then(()=> {
                return new Promise((resolve, reject)=> {
                    params = params || {};
                    params.v = this.version;
                    VK.api(method, params, (response)=> {
                        if (response.error) {
                            reject(new Error(response.error.error_msg));
                        } else {
                            resolve(response.response);
                        }
                    });
                });
            });
        }

        get name() {
            return this.callApi('users.get').then(r => `Музыка ВКонтакте [${r[0].first_name} ${r[0].last_name}]`);
        }

        get playlist() {
            return this.callApi('audio.get').then(r => r.items);
        }
    };
});
