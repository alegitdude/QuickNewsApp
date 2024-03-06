<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://quick-news.azurewebsites.net/general">
    <img src="https://quick-news.azurewebsites.net/assets/Color_Logo_Edit-qojq1iSC.png" alt="Logo" width="180" height="80">
  </a>

<h3 align="center">Quick News</h3>

  <p align="center">
    A full stack, real-time news aggregator with custom source curation. Utilizing React and ASP.Net, hosted on Azure. 
    <br />
    <br/>
    <a href="https://quick-news.azurewebsites.net/general">https://quick-news.azurewebsites.net/</a>
    <br />
    <br />
    <a href="https://quick-news.azurewebsites.net/general">View Demo</a>
    ·
    <a href="https://github.com/alegitdude/QuickNewsApp/issues">Report Bug</a>
    ·
    <a href="https://github.com/alegitdude/QuickNewsApp/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p>The front end utilizes React, Algolia AI Search, Redux, RTK Query, & Tailwind CSS. </p>
<p>The back end utilizes ASP.Net, MediatR, Entity Framework, Algolia Search, ASP.Net Core Identity  </p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these example steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/alegitdude/QuickNewsApp.git
   ```
2. Install .Net packages
   ```sh
   cd API dotnet install
   ```
2. Install npm packages
   ```sh
   cd client-app npm install
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

You will need to have a database of articles to access for this project to work locally. Once that is established, 
you'll need to enter the connection string for your SQL server where they are hosted in API/appsettings.json under "SqlDbPass". 
Then you will need a hexadecimal key for password encryption entered under "TokenKey". You don't need Algolia Keys to run the app but they are free to sign up for. 
Once you have them, enter the admin key under "AlgoliaAdmin" and the search key as "AlgoliaSearch". With those 4 keys you can use all the functionality in the application.

The front-end is in the folder "client-app". cd into that folder and type "npm run dev" to run the front end. Then add another terminal window and inside the "API" folder run "dotnet run"

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

rickbhughey@gmail.com

Project Link: [https://github.com/github_alegitdude/QuickNewsApp](https://github.com/alegitdude/QuickNewsApp)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/alegitdude/QuickNewsApp.svg?style=for-the-badge
[contributors-url]: https://github.com/alegitdude/QuickNewsApp/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/alegitdude/QuickNewsApp.svg?style=for-the-badge
[forks-url]: https://github.com/alegitdude/QuickNewsApp/network/members
[stars-shield]: https://img.shields.io/github/stars/alegitdude/QuickNewsApp.svg?style=for-the-badge
[stars-url]: https://github.com/alegitdude/QuickNewsApp/stargazers
[issues-shield]: https://img.shields.io/github/issues/alegitdude/QuickNewsApp.svg?style=for-the-badge
[issues-url]: https://github.com/alegitdude/QuickNewsApp/issues
[license-shield]: https://img.shields.io/github/license/alegitdude/QuickNewsApp.svg?style=for-the-badge
[license-url]: https://github.com/alegitdude/QuickNewsApp/blob/master/LICENSE.txt
[product-screenshot]: /client/public/Ideas-Site%20Screenshot.png
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
