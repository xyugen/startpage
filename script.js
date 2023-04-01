const sites = [
    {'a': 'AWS', 'url': 'https://aws.amazon.com/'},
    {'b': 'Facebook', 'url': 'https://www.facebook.com/'},
    {'c': 'ChatGPT', 'url': 'https://www.chat.openai.com/'},
    {'d': 'Dribbble', 'url': 'https://dribbble.com/'},
    {'f': 'Figma', 'url': 'https://www.figma.com/'},
    {'g': 'Github', 'url': 'https://github.com/'},
    {'i': 'Instagram', 'url': 'https://www.instagram.com/'},
    {'k': 'Keep', 'url': 'https://keep.google.com/'},
    {'m': 'Mail', 'url': 'https://mail.google.com/'},
    {'n': 'Notion', 'url': 'https://www.notion.so/'},
    {'r': 'Reddit', 'url': 'https://www.reddit.com/'},
    {'s': 'Shopee', 'url': 'https://shopee.com/'},
    {'t': 'Twitter', 'url': 'https://twitter.com/'},
    {'y': 'YouTube', 'url': 'https://www.youtube.com/'},
    {'0': 'localhost', 'url': 'http://localhost:3000/'},
];

const content = document.querySelector('.content');

let ul = document.createElement('ul');
ul.classList.add('sites');

sites.forEach((item, index) => {
    if (index > 0 && index % 5 === 0) {
        content.appendChild(ul);
        ul = document.createElement('ul');
        ul.classList.add('sites');
    }

    const li = document.createElement('li');
    const span = document.createElement('span');
    const div = document.createElement('div')

    span.innerText = Object.keys(item)[0];
    span.classList.add('command');

    div.appendChild(document.createTextNode(Object.values(item)[0]));

    li.appendChild(span);
    li.appendChild(div);
    li.classList.add('site', Object.keys(item)[0]);

    ul.appendChild(li);
});

//ul.classList.add('sites');
content.appendChild(ul); // Add the final <ul> element

// makes input focused on search
const search = document.querySelector('.search');

search.focus();

setInterval(() => {
    search.focus();
}, 100);

let urlFound = null;

const checkValue = (value) => {
    value = value.toLowerCase().trim();
    console.log(`SEARCH: ${value.substring(1)}`);
    urlFound = null;
    sites.forEach((item) => {
        if (value == `\\${Object.keys(item)[0]}`/*|| Object.values(item)[0].toLowerCase().includes(value)*/)
        {
            console.log(`SITE: ${Object.keys(item)[0]}`);
            console.log(`URL: ${Object.values(item)[1]}`)
            if (!urlFound) {
                urlFound = encodeURI(Object.values(item)[1]);
            }
            document.querySelector(`.${Object.keys(item)[0]} div`).classList.remove('opacity-low');
            return;
        }
    });
};

const opacityToggle = (element) => {
    console.log(`BAR: ${search.value}`);
    if (search && search.value)
        element.classList.add('opacity-low');
    else
        element.classList.remove('opacity-low');
};

const div = document.querySelectorAll('.site div');

const handleChange = () => {
    div.forEach(element => {
        opacityToggle(element);
    });
    checkValue(search.value);
};

const handleSearch = () => {
    console.log(`URL: ${urlFound}`);
    if (urlFound)
        window.location.href = urlFound;
    else
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(search.value.trim())}`;
};

// COLOR THEME CHANGE
const setTheme = (themeName) => {
    document.body.className = 'theme-' + themeName;
    localStorage.setItem('theme', themeName);
};

// check previously set theme in localStorage
(() => {
    if (localStorage.getItem('theme') == 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
})();
