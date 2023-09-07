var user1 = {
    userName: '@elonmusk',
    displayName: 'Elon Musk',
    joinedDate: 'June 2009',
    followingCount: 103,
    followerCount: 47900000,
    avatarURL: 'your-turn-dynamic-twitter/assets/elonmusk.jpg',
    coverPhotoURL: 'your-turn-dynamic-twitter/assets/elonmusk-cover.jpeg',
    verified: true,
    tweets: [
        {
            text: 'I admit to judging books by their cover',
            timestamp: '2/10/2021 00:01:20'
        },
        {
            text: 'Starship to the moon',
            timestamp: '2/09/2021 18:37:12'
        },
        {
            text: 'Out on launch pad, engine swap underway',
            timestamp: '2/09/2021 12:11:51'
        }
    ]
};

var user2 = {
    userName: '@BillGates',
    displayName: 'Bill Gates',
    joinedDate: 'June 2009',
    followingCount: 274,
    followerCount: 53800000,
    avatarURL: 'your-turn-dynamic-twitter/assets/billgates.jpg',
    coverPhotoURL: 'your-turn-dynamic-twitter/assets/billgates-cover.jpeg',
    verified: false,
    tweets: [
        {
            text: 'Everybody asks, how is the next Windows coming along? But nobody asks how is Bill? :/',
            timestamp: '2/10/2021 00:01:20'
        },
        {
            text: 'Should I start tweeting memes? Let me know in a comment.',
            timestamp: '2/09/2021 18:37:12'
        },
        {
            text: 'In 2020, I read a book every hour.',
            timestamp: '2/09/2021 12:11:51'
        }
    ]
};

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    var urlSearch = window.location.search;
    var userProfile = urlSearch.substring(10) == 1 ? user1 : user2;
    console.log(userProfile);

    if ( this,this.readyState == 4 && this.status == 200) {
        var header = document.getElementById("header");
        var profilePhoto = document.getElementById("photo");
        var profileInfo = document.getElementById("profile-info");
        var menuRibbon = document.getElementById("menu-ribbon");
        var posts = document.getElementById("posts");
        
        //header: BackBtn, FullName, Tweets Count
        
        header.innerHTML = `
            <a href="https://twitter.com/?lang=en" class="backBtn">🡨</a>
            <div class="headerName">
                <h2>${userProfile.displayName}</h2>
                <p>${userProfile.tweets.length} Tweets</p>
            </div>
            ${userProfile.verified == false ? '' : '<img class="verified-img" src="badge.png">'}
            
        `;

        //photo: CoverPhoto, ProfilePicture and Follow Button
        profilePhoto.innerHTML = `
            <img src="${userProfile.coverPhotoURL}" class="cover-photo">
            <div class="profilePicBtn">
                <img src="${userProfile.avatarURL}">
                <button>Following</button>
            </div>        
        `;
    
        //profile-info: ProfileName, Follower and Following Count and Join Date
        profileInfo.innerHTML = `
            <div class="profileName">
                <h2>${userProfile.displayName}</h2>
                ${userProfile.verified == false ? '' : '<img class="verified-img" src="badge.png">'}
                </div>
            <div class="profileSummary">
                <p>${userProfile.userName}</p>
                <p>&#x1F4C5; Joined ${userProfile.joinedDate}</p>
                <p><strong>${userProfile.followingCount}</strong> Following  <strong>${userProfile.followerCount}</strong> Followers</p>
            </div>
        `;

        //menuRibbon: menu Tabs
        menuRibbon.innerHTML = `
        <p class="tabs">Tweets</p>
        <p class="tabs">Tweets & Replies</p>
        <p class="tabs">Media</p>
        <p class="tabs">Likes</p>
        `;

        //posts: Tweets with Profile Info and Post Content 
        posts.innerHTML = `
            ${userProfile.tweets.map(function(post) {
                return `
                    <div class="post">
                        <div class="post-leftSec">
                            <img src="${userProfile.avatarURL}">
                        </div>
                        <div class="post-midSec">
                            <div class="posterInfo">
                                <h3>${userProfile.displayName}</h3>
                                ${userProfile.verified == false ? '' : '<img class="verified-img" src="badge.png">'}
                                <p>${userProfile.userName}</p>
                                <p>${timeElapsed(parseTime(post.timestamp))}</p>
                            </div>
                            <div class="postInfo">
                                <p>${post.text}</p>
                            </div>
                            <div>
                            </div>
                        </div>
                        <div class="post-rightSec">
                            <p>&hellip;</p>
                        </div>
                    </div>
                    `
            }).join(' ')}
        `;
                

    }
}
xhttp.open("GET", "", true);
xhttp.send();

function parseTime(timestamp) {
    var parts = timestamp.split(' '); // Split by space to separate date and time
    var datePart = parts[0];
    var timePart = parts[1];
    
    var dateComponents = datePart.split('/'); // Split date by slashes
    var timeComponents = timePart.split(':'); // Split time by colons
    
    var day = parseInt(dateComponents[0]);
    var month = parseInt(dateComponents[1]) - 1; // Months in Date object are zero-based
    var year = parseInt(dateComponents[2]);
    
    var hours = parseInt(timeComponents[0]);
    var minutes = parseInt(timeComponents[1]);
    var seconds = parseInt(timeComponents[2]);
    
    return new Date(year, month, day, hours, minutes, seconds);
}

function timeElapsed (postedDate){
    var dateNow = Date.now();
    var timeDiff = (dateNow - postedDate)/1000; // Difference in seconds

    if (timeDiff/86400 > 1) //Days/Years:
    {
        if ((timeDiff/86400) >= 365)
            return (parseInt((timeDiff/86400)/365)+"y");
        return (parseInt(timeDiff/86400)+"d");
    } 
    else if (timeDiff/3600 > 1)//Hours
    {
        return (parseInt(timeDiff/3600)+"h");
    }
    else if(timeDiff/60 > 1) //Minutes
    {
        return (parseInt(timeDiff/60)+"m");
    }
    console.log("Now: "+dateNow+" datePosted: "+postedDate+" timeDiff: "+timeDiff)
    return((parseInt(timeDiff)+"s")); //Seconds

}
