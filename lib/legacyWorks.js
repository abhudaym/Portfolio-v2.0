// Projects that used to be hand-written pages. Rendered by pages/works/[id].js when Sanity has no entry.
export const LEGACY_WORKS = [
  {
    id: "eproshop", title: "eProShop", year: "2021", thumbnail: "/images/works/eproshop_01.jpg",
    description: "An eCommerce web-application built using MERN Stack.",
    body: "This is an eCommerce web application created with MERN Stack. It has user authentication system, an admin user who can add new products in the app, check for order and payments and also choose which order has been delivered from the store. It is also connected to PayPal for payments.",
    images: ["/images/works/eproshop_02.jpg", "/images/works/eproshop_01.jpg", "/images/works/eproshop_03.jpg"],
    website: "https://eproshop1.herokuapp.com/", platform: "Web Browser",
    stack: "MongoDB, Express, React, NodeJS, Redux, MaterialUI", source: "https://github.com/abhudaym/eproshop",
  },
  {
    id: "prefabmart", title: "PrefabMart", year: "2021", thumbnail: "/images/works/prefab_01.jpg",
    description: "World's first online Prefabricated structure selling platform",
    body: "This website will list down the Prefab/Pod products that are serviceable in the user input area and meet buyer demands by providing them the required product & services. This website was developed as a prototype for Microsoft Developer League 2021.",
    images: ["/images/works/prefab_01.jpg", "/images/works/prefab_02.jpg", "/images/works/prefab_03.jpg"],
    website: "https://prefab-msft.azurewebsites.net/", platform: "Web Browser",
    stack: "NodeJS, Express, MongoDB, React, Redux, Microsoft Azure", source: "https://github.com/abhudaym/Prefab",
  },
  {
    id: "linkedhub", title: "LinkedHub", year: "2020", thumbnail: "/images/works/linkedhub_01.jpg",
    description: "A social networking site for developers created using MERN Stack.",
    body: "A social networking site for developers created using MERN Stack with the functionality of posts, profile, likes and comments. The idea was to incorporate GitHub with Stack Overflow where developers can communicate.",
    images: ["/images/works/linkedhub_04.jpg", "/images/works/linkedhub_01.jpg", "/images/works/linkedhub_03.jpg"],
    website: "https://linkedhub.herokuapp.com/", platform: "Web Browser",
    stack: "NodeJS, Express, MongoDB, React", source: "https://github.com/abhudaym/linkedHub",
  },
  {
    id: "covidTracker", title: "Covid Tracker", year: "2020", thumbnail: "/images/works/covidTracker_01.jpg",
    description: "Coronavirus tracker for each country and each state in India built using ReactJS.",
    body: "Coronavirus tracker for each country and each state in India built using ReactJS.",
    images: ["/images/works/covidTracker_01.jpg"],
    website: "https://abhudaym-covidtracker.netlify.app/", platform: "Web Browser",
    stack: "ReactJS, MaterialUI", source: "https://github.com/abhudaym/CovidTracker",
  },
];
