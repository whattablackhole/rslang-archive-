"use strict";
exports.__esModule = true;
exports.gameWordsFactory = void 0;
var game_storage_words_service_1 = require("./game-storage-words.service");
var game_user_words_service_1 = require("./game-user-words.service");
exports.gameWordsFactory = function (wordsDataService, authService, gameCoreService, userAggregatedWordsService) {
    if (authService.getIsUserAuthenticated()) {
        return new game_user_words_service_1.UserWordsService(gameCoreService, userAggregatedWordsService, wordsDataService);
        // return UserWordsService;
    }
    return new game_storage_words_service_1.GameStorageWordsService(gameCoreService, wordsDataService);
    //   return GameStorageWordsService;
};
// export const gameWordsProvider = {
//   provide: GameWordsService,
//   useFactory: gameWordsFactory,
//   deps: [UserAggregatedWordsService, GameCoreService, WordsDataService, AuthService],
// };
