"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GameCoreService = void 0;
var core_1 = require("@angular/core");
var base_url_1 = require("src/app/shared/constants/base-url");
var GameCoreService = /** @class */ (function () {
    function GameCoreService(localStorageService) {
        this.localStorageService = localStorageService;
        this.getWordsPath = function (group, page) {
            return base_url_1.BASE_URL + "/words?group=" + group + "&page=" + page;
        };
        this.getUserWordsPath = function (id) { return base_url_1.BASE_URL + "/users/" + id + "/words"; };
    }
    GameCoreService.prototype.addWordsToLocalStorage = function (words) {
        var _this = this;
        var wordsByPages = this.sortByPage(words);
        wordsByPages.forEach(function (item) {
            var wordsString = JSON.stringify(item.words);
            _this.localStorageService.setItem(item.words[0].group + "-" + item.page, wordsString);
        });
    };
    GameCoreService.prototype.sortByPage = function (words) {
        var pagesArray = [];
        words.forEach(function (item) {
            if (!pagesArray.length) {
                pagesArray.push({ page: item.page, words: [item] });
            }
            else {
                pagesArray.forEach(function (pageItem, index) {
                    if (pageItem.page === item.page) {
                        pagesArray[index].words.push(item);
                    }
                    else {
                        pagesArray.push({ page: item.page, words: [item] });
                    }
                });
            }
        });
        return pagesArray;
    };
    GameCoreService.prototype.addStatsToLocalStorage = function (stats) {
        var result = this.localStorageService.getItem('statistics');
        if (result) {
            try {
                result = JSON.parse(result);
            }
            catch (_a) {
                result = null;
            }
        }
        if (Array.isArray(result)) {
            result.push(stats);
            this.localStorageService.setItem('statistics', JSON.stringify(result));
        }
        else {
            this.localStorageService.setItem('statistics', JSON.stringify([stats]));
        }
    };
    GameCoreService.prototype.getLocalStorageWords = function (group, page) {
        var result = this.localStorageService.getItem(group + "-" + page);
        if (result) {
            try {
                result = JSON.parse(result);
            }
            catch (_a) {
                result = null;
            }
        }
        return result;
    };
    GameCoreService.prototype.filterGameWords = function (words) {
        return words.filter(function (word) {
            return word.userStats.difficulty !== 'removed' &&
                word.userStats.optional.knowledgeDegree < 3;
        });
    };
    // addStudyStats(
    //   sortedWords: WordWithStatistics[],
    //   gameResultWords: GameResults
    // ): WordWithStatistics[] {
    //   sortedWords.forEach((item: WordWithStatistics) => {
    //     item.userStats.optional.toStudy.successfully =
    //       gameResultWords.correctWords.length;
    //     item.userStats.optional.toStudy.total += 1;
    //   });
    // }
    GameCoreService.prototype.addLocalToSortedWords = function (sortedWords, unSortedwords) {
        var sorted = sortedWords;
        for (var i = 0; i < sorted.length; i += 1) {
            for (var y = 0; y < unSortedwords.length; y += 1) {
                if (sorted[i].id === unSortedwords[y].id) {
                    sorted.splice(i, 1, unSortedwords[y]);
                    break;
                }
            }
        }
        return sorted;
    };
    GameCoreService.prototype.addToSortedWords = function (sortedWords, unSortedwords) {
        var sorted = sortedWords;
        unSortedwords.forEach(function (filteredWord) {
            sorted = sorted.map(function (sortedWord) {
                if (sortedWord.id === filteredWord.wordId) {
                    return __assign(__assign({}, sortedWord), { userStats: {
                            difficulty: filteredWord.difficulty,
                            optional: filteredWord.optional
                        } });
                }
                return sortedWord;
            });
        });
        return sorted;
    };
    GameCoreService.prototype.decreasePageNumber = function (page) {
        var pageInt = parseInt(page, 10);
        pageInt -= 1;
        return pageInt.toString();
    };
    GameCoreService.prototype.playAudio = function (url) {
        var audio = new Audio();
        audio.src = url;
        audio.load();
        audio.play()["catch"](function (err) {
            console.error(err);
        });
    };
    GameCoreService.prototype.generateStats = function (gameResults, gameStreak, gameName) {
        var correctWords = [];
        var incorrectWords = [];
        gameResults.correctWords.forEach(function (word) {
            correctWords.push({ id: word.id });
        });
        gameResults.incorrectWords.forEach(function (word) {
            incorrectWords.push({ id: word.id });
        });
        var statistics = {
            correctWords: correctWords,
            incorrectWords: incorrectWords,
            gameName: gameName,
            streak: gameStreak,
            date: new Date(Date.now()).toISOString()
        };
        return statistics;
    };
    GameCoreService.prototype.toWordsWithStatistics = function (words) {
        return words.map(function (elem) { return (__assign(__assign({}, elem), { userStats: {
                difficulty: '',
                optional: {
                    toStudy: {},
                    knowledgeDegree: 0,
                    page: 'unset',
                    group: 'unset'
                }
            } })); });
    };
    GameCoreService.prototype.toWordWithStatistics = function (word) {
        return __assign(__assign({}, word), { userStats: {
                difficulty: 'hard',
                optional: {
                    toStudy: {},
                    knowledgeDegree: 0,
                    page: 'unset',
                    group: 'unset'
                }
            } });
    };
    GameCoreService.prototype.filterWordsByGroupPage = function (words, group, page) {
        return words.filter(function (word) {
            return word.optional.group.toString() === group &&
                word.optional.page.toString() === page;
        });
    };
    GameCoreService = __decorate([
        core_1.Injectable()
    ], GameCoreService);
    return GameCoreService;
}());
exports.GameCoreService = GameCoreService;
