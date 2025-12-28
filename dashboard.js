// SCORE SAVING FUNCTION - UPDATED FOR CLOUD
async function saveScoreToDashboard(playerName, playerScore, gameType) {
    // Create score object
    const scoreData = {
        playerName: playerName,
        score: playerScore,
        gems: gems,
        gameType: gameType,
        timestamp: new Date().toISOString(),
        deviceId: localStorage.getItem('deviceId') || 'unknown'
    };
    
    // Save to cloud
    const cloudSuccess = await saveGameScoreToCloud(playerName, playerScore, gameType);
    
    if (cloudSuccess) {
        console.log('✅ Score saved to cloud');
    } else {
        console.log('⚠️ Saved to local storage (cloud unavailable)');
    }
    
    // Also save player data to cloud (including gems and items)
    const playerData = {
        name: playerName,
        gems: gems,
        items: playerItems,
        color: playerColor,
        equippedAccessories: equippedAccessories,
        equippedHair: equippedHair,
        equippedTop: equippedTop,
        equippedBottom: equippedBottom,
        equippedSpecialBlocks: equippedSpecialBlocks,
        lastPlayed: new Date().toISOString(),
        lastScore: playerScore,
        totalGames: (localStorage.getItem(`${playerName}_totalGames`) || 0) + 1
    };
    
    await savePlayerToCloud(playerName, playerData);
    
    // Keep local backup
    localStorage.setItem('gameScores', JSON.stringify(
        JSON.parse(localStorage.getItem('gameScores') || '[]')
            .concat(scoreData)
            .slice(-50)
    ));
    
    console.log('Score saved:', scoreData);
    
    // Refresh all player data from cloud to update other players
    await updateAllPlayersFromCloud();
}