/// <reference path="jquery-1.9.1.min.js" />
/// <reference path="knockout-3.4.1.js" />
/// <reference path="lodash.min.js" />



var AppViewModel = function () {

    var self = this;
    self.currentMovie = ko.observable(null);
    self.searchedMovies = ko.observableArray([]);
    self.searchString = ko.observable();
    self.quiz = ko.observable(false);
    self.question = ko.observable(new Question());
    
    self.startQuiz = function () {
        self.question().prevButton(false);
        self.currentMovie(null);
        self.quiz(true);
        self.question().reset();
    }

    self.rightQuestionClick = function () {
        var dto = self.question().yesClick();
        if(dto) {
            var newMovie = new Movie(dto);
            self.searchedMovies([]);
            self.currentMovie(newMovie);
            self.quiz(false);
        }
    }
    self.leftQuestionClick = function () {
        
        var dto = self.question().noClick();
        if (dto) {
            var newMovie = new Movie(dto);
            self.searchedMovies([]);
            self.currentMovie(newMovie);
            self.quiz(false);
        }
    }


    self.reset = function () {
        self.currentMovie(null);
        self.searchedMovies([]);
        self.searchString('');
        self.quiz(false);
        self.question().prevButton(false);
    }
    
    self.searchMovies = function () {
        self.currentMovie(null);
        $.get("https://api.themoviedb.org/3/search/movie", {
            api_key: "51cb521423c01a8aa772bfe22e7a83c9",
            language: "en-US",
            query: self.searchString(),
            page: "1",
            include_adult: "false"
        }, function (data) {
            
            self.searchedMovies([]);
            var resultsArray = data.results;
            resultsArray.forEach(function (i) {
                self.searchedMovies.push(new Movie(i));
            });
            
            
        });
    }
    self.pickMovie = function (movie) {
        self.searchedMovies([]);
        self.currentMovie(movie);
    }
    
}






var Movie = function (dto) {
    var self = this;
    self.title = ko.observable(dto.title);
    self.posterPath = ko.observable("https://image.tmdb.org/t/p/w154" + dto.poster_path);
    self.overview = ko.observable(dto.overview);
    self.release_date = ko.observable(dto.release_date);
    self.popularity = ko.observable(dto.vote_average + "/ 10");
    self.largerPosterPath = ko.observable("https://image.tmdb.org/t/p/w342" + dto.poster_path)
 
}

var Question = function () {
    var self = this;
    
    self.initialString = "Do you prefer live action over animated films?";
    self.questionText = ko.observable(self.initialString);
    self.liveActionQuestion_1 = "Are you recently getting over a breakup?";
    self.liveActionQuestion_2 = "Do you want to cry?";
    self.liveActionQuestion_3 = "Do you prefer 'hot' and 'hunky' guys?";
    self.animationQuestion_1 = "Do you prefer classic animation to CG?";
    self.animationQuestion_2 = "Do you have a soft spot for the living dead?";
    self.animationQuestion_3 = "Do you just LOOOOOOOVE androids?";
    self.prevButton = ko.observable(false);
    var Wall_e = {
        poster_path: "/9cJETuLMc6R0bTWRA5i7ctY9bxk.jpg",
        overview: "WALL·E is the last robot left on an Earth that has been overrun with garbage and all humans have fled to outer space. For 700 years he has continued to try and clean up the mess, but has developed some rather interesting human-like qualities. When a ship arrives with a sleek new type of robot, WALL·E thinks he's finally found a friend and stows away on the ship when it leaves.",
        release_date: "2008-06-22",
        id: 10681,
        title: "WALL·E",
        vote_average: 7.7
    }
    var Casablanca = {
        poster_path: "/wOBKAoUJZb5qTsWv5XXvVV2vUzz.jpg",
        overview: "In Casablanca, Morocco in December 1941, a cynical American expatriate meets a former lover, with unforeseen complications.",
        release_date: "1942-11-26",
        id: 289,
        title: "Casablanca",
        vote_average : 7.8
    }
    var SilverLinePlaybook = {
        poster_path: "/ilrZAV2klTB0FLxLb01bOp5pzD9.jpg",
        overview: "After spending eight months in a mental institution, a former teacher moves back in with his parents and tries to reconcile with his ex-wife.",
        release_date: "2012-09-08",
        id: 82693,
        title: "Silver Linings Playbook",
        vote_average: 6.9
    }
    var NightmareChristmas = {
        poster_path: "/6oxkO1VgKCq74fNILKAg6t2dVEt.jpg",
        overview: "Tired of scaring humans every October 31 with the same old bag of tricks, Jack Skellington, the spindly king of Halloween Town, kidnaps Santa Claus and plans to deliver shrunken heads and other ghoulish gifts to children on Christmas morning. But as Christmas approaches, Jack's rag-doll girlfriend, Sally, tries to foil his misguided plans.",
        release_date: "1993-10-09",
        id: 9479,
        title: "The Nightmare Before Christmas",
        vote_average: 7.5
    }
    var BreakfastAtTiffany = {
        poster_path: "/c95lbDwL5WT8PV9DZsdSvRtXKNA.jpg",
        overview: "Fortune hunter Holly Golightly finds herself captivated by aspiring writer Paul Varjak, who's moved into her building on a wealthy woman's dime. As romance blooms between Paul and Holly, Doc Golightly shows up on the scene, revealing Holly's past.",
        release_date: "1961-10-05",
        id: 164,
        title: "Breakfast at Tiffany's",
        vote_average: 7.5
    }
    var FiveHundredDays = {
        poster_path: "/5SjtNPD1bb182vzQccvEUpXHFjN.jpg",
        overview: "Tom (Joseph Gordon-Levitt), greeting-card writer and hopeless romantic, is caught completely off-guard when his girlfriend, Summer (Zooey Deschanel), suddenly dumps him. He reflects on their 500 days together to try to figure out where their love affair went sour, and in doing so, Tom rediscovers his true passions in life.",
        release_date: "2009-07-17",
        id: 19913,
        title: "(500) Days of Summer",
        vote_average: 7.3
    }
    var BeautyAndBeast = {
        poster_path: "/b9QJr2oblOu1grgOMUZF1xkUJdh.jpg",
        overview: "Follow the adventures of Belle, a bright young woman who finds herself in the castle of a prince who's been turned into a mysterious beast. With the help of the castle's enchanted staff, Belle soon learns the most important lesson of all -- that true beauty comes from within.",
        release_date: "1991-11-12",
        id: 10020,
        title: "Beauty and the Beast",
        vote_average: 7.3
    }
    var UP = {
        poster_path: "/nk11pvocdb5zbFhX5oq5YiLPYMo.jpg",
        overview: "Carl Fredricksen spent his entire life dreaming of exploring the globe and experiencing life to its fullest. But at age 78, life seems to have passed him by, until a twist of fate (and a persistent 8-year old Wilderness Explorer named Russell) gives him a new lease on life.",
        release_date: "2009-05-13",
        id: 14160,
        title: "Up",
        vote_average: 7.6
    }
    self.yesClick = function () {
        switch (self.questionText()) {
            case self.initialString: {
                self.prevButton(true);
                self.questionText(self.liveActionQuestion_1);
                return;
            }
            case self.liveActionQuestion_1: {
                self.questionText(self.liveActionQuestion_2);
                return;
            }
            case self.liveActionQuestion_2: {
                // Display CasaBlanca
                return Casablanca;
               
            }
            case self.liveActionQuestion_3: {
                // Display Silver Lingings Playbook
                return SilverLinePlaybook;
            }
            case self.animationQuestion_1: {
                self.questionText(self.animationQuestion_2);
                return;
            }
            case self.animationQuestion_2: {
                // Display Nightmare before Christmas
                return NightmareChristmas;
            }
            case self.animationQuestion_3: {
                // display Wall-e
                return Wall_e;
            }
        }

    }

    self.noClick = function () {
        switch (self.questionText()) {
            case self.initialString: {
                self.prevButton(true);
                self.questionText(self.animationQuestion_1);
                return;
            }
            case self.liveActionQuestion_1: {
                self.questionText(self.liveActionQuestion_3);
                return;
            }
            case self.liveActionQuestion_2: {
                // Display Breakfast at Tiffany's
                return BreakfastAtTiffany;
            }
            case self.liveActionQuestion_3: {
                // Display 500 Days of Summer
                return FiveHundredDays;
            }
            case self.animationQuestion_1: {
                self.questionText(self.animationQuestion_3)
                return;
            }
            case self.animationQuestion_2: {
                // Display Beauty and the Beast
                return BeautyAndBeast;
            }
            case self.animationQuestion_3: {
                // Display UP
                return UP;
            }
        }
    }
    self.backClick = function () {
        switch (self.questionText()) {
            case self.liveActionQuestion_1: {
                self.prevButton(false);
                self.questionText(self.initialString);
                return;
            }
            case self.liveActionQuestion_2: {
                self.questionText(self.liveActionQuestion_1);
                return;
            }
            case self.liveActionQuestion_3: {
                self.questionText(self.liveActionQuestion_1);
                return;
            }
            case self.animationQuestion_1: {
                self.prevButton(false);
                self.questionText(self.initialString);
                return;
            }
            case self.animationQuestion_2: {
                self.questionText(self.animationQuestion_1);
                return;
            }
            case self.animationQuestion_3: {
                self.questionText(self.animationQuestion_1);
                return;
            }
        }
    }
    self.reset = function () {
        debugger;
        self.questionText(self.initialString);
        self.prevButton(false);
    }
}

Movie.prototype.getMovie = function(id) {
    // Get the movie from the database, returns a movie object
}


