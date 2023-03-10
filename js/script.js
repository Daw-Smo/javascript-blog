'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

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
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = 5,
  optCloudClassPrefix = "tag-size-",
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list';

function generateTitleLinks(customSelector = '') {

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

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
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

generateTags();

function tagClickHandler(event) {

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

function addClickListenersToTags() {
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

const optArticleAuthorSelector = '.post-author';

function generateAuthors() {
  /* [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  

  /* find all articles */
  const articles = document.querySelectorAll('.post');
  console.log(`Articles:`, articles);

  /* START LOOP: for every article: */
  for (let article of articles) {

    /* find author wrapper */
    const authorWrapper = article.querySelector('.post-author');
    console.log(`Author wrapper:`, authorWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get author from post-author attribute */
    const articleAuthor = article.querySelector('.post-author').innerHTML;
    console.log(`Author:`, articleAuthor);

    /* generate HTML of the link */
    /* const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li> ';*/
    const linkHTMLData = { articleAuthor: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* [NEW] check if this link is NOT already in allAuthors */
    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      /* [NEW] add author to allAuthors object */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* insert HTML of the link into the author wrapper */
    authorWrapper.innerHTML = html;
    console.log(authorWrapper);
  }
  /* END LOOP: for every article: */

  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector(optAuthorsListSelector);

  /* [NEW] create variable for all links HTML code */
  /* let allAuthorsHTML = ''; */
  const allAuthorsData = {authors: []};

  /* [NEW] START LOOP: for each author in allAuthors: */
  for (let author in allAuthors) {
    /* [NEW] generate code of a link and add it to allAuthorsHTML */
    /*const authorLinkHTML = '<li><a href="#author-' + author + '">' + author + '</a> <span>(' + allAuthors[author] + ')</span></li> ';
    console.log(`Author link HTML:`, authorLinkHTML);
    allAuthorsHTML += authorLinkHTML;
  } */
  allAuthorsData.authors.push({
    author: author,
    count: allAuthors[author],
   /*  className: calculateAuthorClass(allAuthors[author], authorsParams)*/
  });
}
  /* [NEW] END LOOP: for each author in allAuthors:  */

  /* [NEW] add html from allAuthorsHTML to authorList */
  /*authorList.innerHTML = allAuthorsHTML;*/
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log(allAuthorsData);
}

function addClickListenersToAuthors() {
  // Select all author links within post-author wrappers
  const authorLinks = document.querySelectorAll("[href^='#author-']");
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
  const href = clickedElement.getAttribute("href");

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthorLink of activeAuthorLinks) {
    /* remove class active */
    activeAuthorLink.classList.remove("active");
  }
  /* END LOOP: for each active author link */

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorLinks:', authorLinks);
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

function calculateTagsParams(tags) {
  let params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  let classNumber = 0;
  classNumber = Math.floor(((count - params.min) / (params.max - params.min)) * optCloudClassCount + 1);
  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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

    const tagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of tagsArray) {

      /* generate HTML of the link */
      /*const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';*/
      const linkHTMLData = {tag, tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */

      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }

    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.innerHTML = html;
  }

  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create variable for all links HTML code */

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  /*let allTagsHTML = '';*/
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
    /* [NEW] generate code of a link and add it to allTagsHTML 
    const tagLinkHTML =
      '<li><a href="#tag-' + tag + '"class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '</a> <span>(' + allTags[tag] + ')</span></li> ';
    console.log('tagLinkHTML:', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }*/
  /* [NEW] END LOOP: for each tag in allTags:  */

  /* [NEW] add html from allTagsHTML to tagList */
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  /* tagList.innerHTML = allTagsHTML;*/
  console.log('AllTagsData:', allTagsData);
}

