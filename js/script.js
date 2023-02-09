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
  console.log('hrefAttribute:', hrefAttribute);

  /* find the correct article using the selector (value of 'href' attribute) */
  
  const correctArticle = document.querySelector(hrefAttribute);
  console.log('correctArticle:', correctArticle);

  /* add class 'active' to the correct article */

  correctArticle.classList.add('active');
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log(customSelector);
  let html = '';

  for (let article of articles) {

    /* get the article id */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* find the title element */

    const titleElement = article.querySelector(optTitleSelector);

    /* get the title from the title element */

    const articleTitle = titleElement.innerHTML;

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* insert link into titleList */

    html = html + linkHTML;

  }

  titleList.innerHTML = html;
  console.log(html);

  const links = document.querySelectorAll('.titles a');
  
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');
console.log(links);

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
  /* find all articles */
  
  const articles = document.querySelectorAll('.post');
  console.log(`Articles:`, articles);

  /* START LOOP: for every article: */
  
  for (let article of articles) {

    /* find tags wrapper */
    
    const tagsWrapper = article.querySelector('.post-tags .list');
    console.log(`Tags wrapper:`, tagsWrapper);

    /* make html variable with empty string */
    
    let html = '';

    /* get tags from data-tags attribute */
    
    const articleTags = article.getAttribute('data-tags');
    console.log(`Data tags:`, articleTags);

    /* split tags into array */
    
    const articleTagsArray = articleTags.split(' ');
    console.log(`Tags array:`, articleTagsArray);

    /* START LOOP: for each tag */
    
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
      console.log(`Link HTML:`, linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* END LOOP: for each tag */

    }
    console.log(`HTML:`, html);

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;
  }

  /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  /* find all tag links with class active */
  const activeTagLinks = document.querySelectorAll("a.active[href^='#tag-']");
  /* START LOOP: for each active tag link */
  for (let activeTagLink of activeTagLinks) {
    /* remove class active */
    activeTagLink.classList.remove('active');
  }
  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll("a[href='" + href + "']")
  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
  }
  /* END LOOP: for each found tag link */
  console.log('Tag links with class active:', activeTagLinks);
  console.log('Tag links with href equal to ${href}:', tagLinks);
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll("a[href^='#tag-']");
  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener("click", tagClickHandler);
}

  /* END LOOP: for each link */
  console.log('Tag links:', tagLinks);
}

addClickListenersToTags();

const optArticleAuthorSelector = '.post-author [data-author]';

function generateAuthors() {
  // Select all articles
  const articles = document.querySelectorAll(optArticleAuthorSelector);
  // Loop through each article
  for (let article of articles) {
    // Get the author name from data-author attribute of the article
    const author = article.getAttribute('data-author');
    // Select the author link within the post-author wrapper
    const authorLink = article.querySelector('.post-author a');
    // Add click event listener to the author link
    authorLink.addEventListener('click', authorClickHandler);
  }
  console.log('Authors generated successfully.');
}

function addClickListenersToAuthors() {
  // Select all author links within post-author wrappers
  const authorLinks = document.querySelectorAll('.post-author a');
  // Loop through each author link
  for (let authorLink of authorLinks) {
    // Add click event listener to the author link
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function authorClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace("#author-", "");
  
  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll("a.active[href^='#author-']");
  
  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {
  /* remove class active */
  activeAuthorLink.classList.remove("active");
  }
  /* END LOOP: for each active author link */
  
  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(a[href='${href}']);
  
  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
  /* add class active */
  authorLink.classList.add("active");
  }
  /* END LOOP: for each found author link */
  
  /* execute function "generateTitleLinks" with author selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
  }

generateAuthors();
addClickListenersToAuthors();



