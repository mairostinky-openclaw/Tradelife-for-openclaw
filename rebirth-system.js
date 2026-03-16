// ===================== REBIRTH SYSTEM =====================
// Add this to your Tradelife game

function getRebirthRequirement() {
    return Math.floor(100000000000 * Math.pow(1.5, (state.player.rebirthCount || 0)));
}

function openRebirthModal() {
    if (!state.player) {
        showToast('Error', 'Start or load a game first!', 'danger');
        return;
    }
    
    const req = getRebirthRequirement();
    const nw = calcNetWorth();
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:450px;text-align:center">
            <div style="font-size:4rem;margin-bottom:1rem">🔄</div>
            <h2 style="color:var(--brand);margin-bottom:0.5rem">REBIRTH</h2>
            <p style="color:var(--text-muted);margin-bottom:1.5rem">Start fresh with $5,000 but keep achievements & level!</p>
            
            <div style="background:var(--bg-panel);border:1px solid var(--border);border-radius:12px;padding:1rem;margin-bottom:1rem">
                <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
                    <span style="color:var(--text-muted)">Current Net Worth</span>
                    <span style="font-weight:700;color:var(--brand)">$${formatNum(nw)}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:0.5rem">
                    <span style="color:var(--text-muted)">Rebirth Cost</span>
                    <span style="font-weight:700;color:var(--danger)">$${formatNum(req)}</span>
                </div>
            </div>
            
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:8px;padding:0.75rem;margin-bottom:1.5rem;font-size:0.8rem;color:var(--text-muted)">
                <strong style="color:var(--warning)">You'll keep:</strong> Level, XP, Achievements, Rebirth Coins<br>
                <strong style="color:var(--danger)">You'll lose:</strong> Cash, Stocks, Crypto, Properties, Companies
            </div>
            
            <div style="display:flex;gap:0.75rem">
                <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()" style="flex:1">Cancel</button>
                <button class="btn btn-primary" onclick="doRebirth();this.closest('.modal-overlay').remove()" style="flex:1">Rebirth Now!</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function doRebirth() {
    const req = getRebirthRequirement();
    if (state.player.cash < req) {
        showToast('Insufficient Funds', 'Need $' + formatNum(req) + ' to rebirth', 'danger');
        return;
    }
    
    const newRebirthCount = (state.player.rebirthCount || 0) + 1;
    const newRebirthCoins = (state.player.rebirthCoins || 0) + 1;
    
    const keepLevel = state.player.level;
    const keepExp = state.player.exp;
    const keepAchievements = state.player.achievements || [];
    
    // Reset everything
    state.player.cash = 5000;
    state.player.portfolio = {};
    state.player.cryptoPortfolio = {};
    state.player.companies = [];
    state.player.properties = [];
    state.player.lifestyle = [];
    state.player.countriesOwned = [];
    state.player.debt = 0;
    state.player.career = null;
    state.player.salary = 0;
    state.player.day = 1;
    state.player.loans = [];
    state.player.clubBalance = 0;
    state.player.aiBots = [];
    
    // Restore persistent
    state.player.level = keepLevel;
    state.player.exp = keepExp;
    state.player.achievements = keepAchievements;
    state.player.rebirthCount = newRebirthCount;
    state.player.rebirthCoins = newRebirthCoins;
    
    showToast('🎉 REBIRTH COMPLETE!', '+1 Rebirth Coin! Total: ' + newRebirthCoins + ' 🪙', 'success');
    saveGame();
    updateUI();
}

// Add to sidebar: 
// <div class="nav-item" onclick="openRebirthModal()" style="color:#f59e0b">🔄 Rebirth</div>

// Add to sidebar stats:
// <div class="stat-row"><span class="stat-label">🪙 Rebirth Coins</span><span class="stat-value" id="stat-rebirth-coins" style="color:#f59e0b">0</span></div>
