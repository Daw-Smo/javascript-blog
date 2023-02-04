'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    console.log('Link was clicked!');
    console.log(event);

    /* remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */

    const clickedElement = this;
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const hrefAttribute = clickedElement.getAttribute('href');
    console.log('hrefAttribute:', hrefAttribute)

    /* find the correct article using the selector (value of 'href' attribute) */

    const correctArticle = document.querySelector(hrefAttribute);
    console.log('correctArticle:', correctArticle)

    /* add class 'active' to the correct article */

    correctArticle.classList.add('active');
}

const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

function generateTitleLinks() {

    /* remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */

    const articles = document.querySelectorAll(optArticleSelector);

    let html = '';

    for (let article of articles) {

        /* get the article id */

        const articleId = article.getAttribute('id');
        console.log(articleId)

        /* find the title element */

        const titleElement = article.querySelector(optTitleSelector);

        /* get the title from the title element */

        const articleTitle = titleElement.innerHTML;

        /* create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML)

        /* insert link into titleList */

        html = html + linkHTML;

    }
    
    titleList.innerHTML = html;
    console.log(html)
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links)

for (let link of links) {
    link.addEventListener('click', titleClickHandler);
}