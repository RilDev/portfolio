/* Manage Cookies */
    // set cookies (create/update)
    const setCookie = (name, value = '', days = 30) => {
        // calculate expiration date
        const date = new Date;
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        // create cookie
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    // get all cookies
    const getAllCookies = () => {
        let cookies = [];
        // get string cookies
        let rawCookies = document.cookie;
        // build cookies array
        let cookiesArray = rawCookies.split(';');
        // build cookies object
        cookies = cookiesArray.map(
            cookie => 
            {
                cookie = cookie.trim().split('=');
                return {
                    name: cookie[0],
                    value: cookie[1]
                }
            }
        );
        return cookies;
    }
    
    // get cookie
    const getCookie = name => {
        // get all existing cookies
        const allCookies = getAllCookies();
        // reindex the cookies to access their values with their name
        const allCookiesIndexedByName = allCookies.map(cookie => {
            return {[cookie.name]: cookie.value};
        })

        // loop through the reindexed cookies and check if it's index matches the searched name
        for (let cookie of allCookiesIndexedByName) {
            if (name in cookie) {
                // return the value of the found cookie
                return cookie[name];
            }
        }

        // no cookies matched the search
        return null;
    }

    // delete cookie
    const deleteCookie = name => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }