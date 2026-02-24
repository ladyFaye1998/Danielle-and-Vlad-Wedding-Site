// Calculate the rating based on game state
function calculateRating() {
    // Calculate rating based on authentic high tea standards
    let rating = 0;
    let perfectScore = false;
    let feedbackDetails = [];
    let clashingPairings = [];

    // Base points for selecting any tea type
    rating += 1;

    // --- BLACK TEA STANDARDS ---
    if (gameState.teaType === 'black') {
        // Temperature standards: 200-212°F (93-100°C)
        // For proper extraction of complex flavors
        if (gameState.temperature >= 205 && gameState.temperature <= 212) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.impeccableTemperature'));
        } else if (gameState.temperature >= 200 && gameState.temperature < 205) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.acceptableTemperature'));
        } else if (gameState.temperature < 195) {
            rating -= 0.5;
            clashingPairings.push(teaLangManager.t('clashing.waterTooCool'));
        }

        // Brewing time standards: 3-5 minutes
        if (gameState.brewingTime === 4) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.perfectSteepingTime'));
        } else if (gameState.brewingTime === 5) {
            rating += 0.75;
            feedbackDetails.push(teaLangManager.t('feedback.robustSteeping'));
        } else if (gameState.brewingTime === 3) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.lighterSteeping'));
        } else if (gameState.brewingTime === 2) {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.insufficientSteeping'));
        }

        // Traditional pairings evaluation
        const complementaryHerbs = ['cinnamon', 'cardamom', 'ginger'];
        const clashingHerbs = ['mint']; // Mint often clashes with black tea's tannins
        const traditionalSweeteners = ['honey', 'sugar'];
        const clashingSweeteners = ['maple', 'agave']; // Not traditional and alter the flavor profile

        // Check for herb clashes
        const hasClashingHerb = gameState.herbs.some(herb => clashingHerbs.includes(herb));
        if (hasClashingHerb) {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.mintBlackTea'));
        }

        // Check for good herb pairings
        let matchingHerbs = gameState.herbs.filter(herb => complementaryHerbs.includes(herb)).length;
        if (matchingHerbs === 1 && !hasClashingHerb) {
            rating += 0.75;
            feedbackDetails.push(teaLangManager.t('feedback.classicHerbPairing'));
        } else if (matchingHerbs > 1 && !hasClashingHerb) {
            // Multiple herbs can be too complex for a proper black tea
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.aromaticComplex'));
        }

        // Evaluate sweetener choices
        const hasClashingSweetener = gameState.sweeteners.some(sweet => clashingSweeteners.includes(sweet));
        if (hasClashingSweetener) {
            rating -= 0.75;
            clashingPairings.push(teaLangManager.t('clashing.unconventionalSweetener'));
        }

        let traditionalSweetenerCount = gameState.sweeteners.filter(sweet => traditionalSweeteners.includes(sweet)).length;
        if (traditionalSweetenerCount === 1 && !hasClashingSweetener) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.traditionalSweetening'));
        } else if (traditionalSweetenerCount > 1) {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.excessiveSweetness'));
        } else if (gameState.sweeteners.length === 0) {
            // Black tea is traditionally served with some sweetness
            rating += 0.25;
            feedbackDetails.push(teaLangManager.t('feedback.classicUnsweetened'));
        }

        // Perfect black tea combination - strict high tea standard
        if (gameState.temperature >= 208 && gameState.temperature <= 212 &&
            gameState.brewingTime === 4 &&
            gameState.herbs.includes('cinnamon') &&
            gameState.herbs.length === 1 &&
            gameState.sweeteners.includes('honey') &&
            gameState.sweeteners.length === 1) {
            perfectScore = true;
            feedbackDetails.push(teaLangManager.t('perfectTea.londonFinest'));
        }
    }

    // --- GREEN TEA STANDARDS ---
    else if (gameState.teaType === 'green') {
        // Temperature standards: 165-175°F (74-80°C)
        if (gameState.temperature >= 168 && gameState.temperature <= 175) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.preciseTemperature'));
        } else if ((gameState.temperature >= 165 && gameState.temperature < 168)) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.acceptableTemperature'));
        } else if (gameState.temperature > 175 && gameState.temperature <= 180) {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.slightlyTooWarm'));
        } else if (gameState.temperature > 180) {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.excessiveHeat'));
        }

        // Brewing time standards: 1-2 minutes
        if (gameState.brewingTime === 2) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.perfectSteepingDuration'));
        } else if (gameState.brewingTime === 3) {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.slightOverSteeping'));
        } else if (gameState.brewingTime === 5) {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.severeOverSteeping'));
        }

        // Traditional pairings
        const complementaryHerbs = ['mint'];
        const clashingHerbs = ['cinnamon', 'cardamom']; // Too strong for delicate green tea
        const complementarySweeteners = ['honey'];
        const clashingSweeteners = ['sugar', 'maple']; // Too strong/distinctive

        // Check for herb clashes
        const hasClashingHerb = gameState.herbs.some(herb => clashingHerbs.includes(herb));
        if (hasClashingHerb) {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.overpoweringHerbs'));
        }

        // Check for complementary herbs
        let matchingHerbs = gameState.herbs.filter(herb => complementaryHerbs.includes(herb)).length;
        if (matchingHerbs === 1 && !hasClashingHerb) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.harmonious'));
        } else if (gameState.herbs.length > 1) {
            rating -= 0.5;
            clashingPairings.push(teaLangManager.t('clashing.tooManyFlavors'));
        } else if (gameState.herbs.length === 0) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.pureAppreciation'));
        }

        // Sweetener evaluation
        const hasClashingSweetener = gameState.sweeteners.some(sweet => clashingSweeteners.includes(sweet));
        if (hasClashingSweetener) {
            rating -= 0.75;
            clashingPairings.push(teaLangManager.t('clashing.overwhelmingSweetener'));
        }

        let complementarySweetenerCount = gameState.sweeteners.filter(sweet => complementarySweeteners.includes(sweet)).length;
        if (complementarySweetenerCount === 1 && !hasClashingSweetener) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.subtleSweetening'));
        } else if (gameState.sweeteners.length > 1) {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.excessiveSweetnessSubtle'));
        } else if (gameState.sweeteners.length === 0) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.authenticUnsweetened'));
        }

        // Perfect green tea combination
        if (gameState.temperature >= 170 && gameState.temperature <= 175 &&
            gameState.brewingTime === 2 &&
            ((gameState.herbs.includes('mint') && gameState.herbs.length === 1) || gameState.herbs.length === 0) &&
            gameState.sweeteners.length === 0) {
            perfectScore = true;
            feedbackDetails.push(teaLangManager.t('perfectTea.kyotoWorthy'));
        }
    }

    // --- WHITE TEA STANDARDS ---
    else if (gameState.teaType === 'white') {
        // Temperature standards: 155-165°F (68-74°C)
        if (gameState.temperature >= 158 && gameState.temperature <= 165) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.idealTemperature'));
        } else if (gameState.temperature >= 155 && gameState.temperature < 158) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.acceptableTemperature'));
        } else if (gameState.temperature > 165 && gameState.temperature <= 170) {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.slightlyTooWarmWater'));
        } else if (gameState.temperature > 170) {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.excessiveHeatDamage'));
        }

        // Brewing time standards: 2 minutes exactly for first steeping
        if (gameState.brewingTime === 2) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.preciseSteepingTime'));
        } else if (gameState.brewingTime === 3) {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.slightOverSteepingClarity'));
        } else if (gameState.brewingTime === 5) {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.excessiveSteepingTime'));
        }

        // White tea is best appreciated pure
        if (gameState.herbs.length === 0) {
            rating += 1.5;
            feedbackDetails.push(teaLangManager.t('feedback.unadulteratedElegance'));
        } else {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.additionsMasking'));
        }

        if (gameState.sweeteners.length === 0) {
            rating += 1.5;
            feedbackDetails.push(teaLangManager.t('feedback.pureExpression'));
        } else {
            rating -= 1;
            clashingPairings.push(teaLangManager.t('clashing.sweetenerConcealing'));
        }

        // Perfect white tea combination
        if (gameState.temperature >= 160 && gameState.temperature <= 165 &&
            gameState.brewingTime === 2 &&
            gameState.herbs.length === 0 &&
            gameState.sweeteners.length === 0) {
            perfectScore = true;
            feedbackDetails.push(teaLangManager.t('perfectTea.chineseCeremony'));
        }
    }

    // --- OOLONG TEA STANDARDS ---
    else if (gameState.teaType === 'oolong') {
        // Temperature standards
        if (gameState.temperature >= 190 && gameState.temperature <= 195) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.optimalTemperature'));
        } else if ((gameState.temperature >= 185 && gameState.temperature < 190) ||
            (gameState.temperature > 195 && gameState.temperature <= 200)) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.suitableTemperature'));
        } else if (gameState.temperature > 200) {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.waterTooHot'));
        }

        // Brewing time standards
        if (gameState.brewingTime === 3) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.perfectSteepingDuration'));
        } else if (gameState.brewingTime === 5) {
            rating += 0.25;
            feedbackDetails.push(teaLangManager.t('feedback.extendedSteep'));
        } else if (gameState.brewingTime === 2) {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.insufficientSteepingTime'));
        }

        // Traditional pairings
        const complementaryHerbs = ['ginger'];
        const clashingHerbs = ['mint', 'cardamom'];

        // Check for herb clashes
        const hasClashingHerb = gameState.herbs.some(herb => clashingHerbs.includes(herb));
        if (hasClashingHerb) {
            rating -= 0.75;
            clashingPairings.push(teaLangManager.t('clashing.competingHerb'));
        }

        // Oolong is often best appreciated pure
        if (gameState.herbs.length === 0) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.respectForTea'));
        } else if (gameState.herbs.filter(herb => complementaryHerbs.includes(herb)).length === 1 && !hasClashingHerb) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.harmonousAccent'));
        }

        // Sweetener evaluation
        if (gameState.sweeteners.length === 0) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.respectForTea'));
        } else if (gameState.sweeteners.includes('honey') && gameState.sweeteners.length === 1) {
            rating += 0.25;
            feedbackDetails.push(teaLangManager.t('feedback.subtleHoney'));
        } else if (gameState.sweeteners.length > 1) {
            rating -= 0.75;
            clashingPairings.push(teaLangManager.t('clashing.excessiveSweetenersMasking'));
        }

        // Perfect oolong tea combination
        if (gameState.temperature >= 190 && gameState.temperature <= 195 &&
            gameState.brewingTime === 3 &&
            gameState.herbs.length === 0 &&
            gameState.sweeteners.length === 0) {
            perfectScore = true;
            feedbackDetails.push(teaLangManager.t('perfectTea.taiwanesePrecision'));
        }
    }

    // --- HERBAL TEA STANDARDS ---
    else if (gameState.teaType === 'herbal') {
        // Temperature standards: 208-212°F (98-100°C)
        if (gameState.temperature >= 208 && gameState.temperature <= 212) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.perfectExtraction'));
        } else if (gameState.temperature >= 200 && gameState.temperature < 208) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.goodTemperature'));
        } else if (gameState.temperature < 195) {
            rating -= 0.5;
            clashingPairings.push(teaLangManager.t('clashing.insufficientHeat'));
        }

        // Brewing time standards: 5-7 minutes for full flavor
        if (gameState.brewingTime === 5) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.idealSteepingDuration'));
        } else if (gameState.brewingTime === 3) {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.insufficientSteepingTime'));
        } else if (gameState.brewingTime === 2) {
            rating -= 0.75;
            clashingPairings.push(teaLangManager.t('clashing.severelyUnderdeveloped'));
        }

        // Herb compatibility check
        const complementaryPairs = [
            ['mint', 'ginger'],
            ['mint', 'honey'],
            ['cinnamon', 'honey'],
            ['cinnamon', 'ginger'],
            ['cardamom', 'cinnamon']
        ];

        const clashingPairs = [
            ['mint', 'cinnamon'],
            ['mint', 'cardamom']
        ];

        // Check for herb clashes
        let hasClashingCombo = false;
        if (gameState.herbs.length >= 2) {
            for (const clashPair of clashingPairs) {
                if (gameState.herbs.includes(clashPair[0]) && gameState.herbs.includes(clashPair[1])) {
                    hasClashingCombo = true;
                    clashingPairings.push(`${clashPair[0]} ${teaLangManager.t('assessment.and')} ${clashPair[1]} ${teaLangManager.t('clashing.discordantFlavors')}`);
                    break;
                }
            }
        }

        // Check for complementary herb combinations
        let hasComplementaryCombo = false;
        if (gameState.herbs.length >= 2 && !hasClashingCombo) {
            for (const goodPair of complementaryPairs) {
                if (gameState.herbs.includes(goodPair[0]) && gameState.herbs.includes(goodPair[1])) {
                    hasComplementaryCombo = true;
                    break;
                }
            }
        }

        // Score herb combinations
        if (hasClashingCombo) {
            rating -= 1;
        } else if (hasComplementaryCombo) {
            rating += 1.5;
            feedbackDetails.push(teaLangManager.t('feedback.masterfuHerbs'));
        } else if (gameState.herbs.length >= 2) {
            rating += 0.75;
            feedbackDetails.push(teaLangManager.t('feedback.interestingBlend'));
        } else if (gameState.herbs.length === 1) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.simpleEffective'));
        } else {
            rating -= 0.25;
            clashingPairings.push(teaLangManager.t('clashing.lacksHerbalCharacter'));
        }

        // Sweetener evaluation for herbal tea
        if (gameState.sweeteners.includes('honey') && gameState.sweeteners.length === 1) {
            rating += 1;
            feedbackDetails.push(teaLangManager.t('feedback.perfectHoney'));
        } else if (gameState.sweeteners.length === 1) {
            rating += 0.5;
            feedbackDetails.push(teaLangManager.t('feedback.pleasantSweetness'));
        } else if (gameState.sweeteners.length > 1) {
            rating -= 0.5;
            clashingPairings.push(teaLangManager.t('clashing.overSweetened'));
        }

        // Perfect herbal tea combination
        if (gameState.temperature >= 210 && gameState.temperature <= 212 &&
            gameState.brewingTime === 5 &&
            gameState.herbs.includes('mint') &&
            gameState.herbs.includes('ginger') &&
            gameState.herbs.length === 2 &&
            gameState.sweeteners.includes('honey') &&
            gameState.sweeteners.length === 1) {
            perfectScore = true;
            feedbackDetails.push(teaLangManager.t('perfectTea.royalGarden'));
        }
    }

    // Ensure rating falls between 1-5 stars
    rating = Math.max(1, Math.min(5, Math.round(rating)));

    // Perfect score bonus
    if (perfectScore && rating < 5) {
        rating = 5;
    }

    console.log(`${teaLangManager.t('calculatedRating')}: ${rating} ${teaLangManager.t('starsWithFeedback')}: ${feedbackDetails.join(', ')}`);
    gameState.rating = rating;

    // Store both positive feedback and clashing combinations for assessment text
    gameState.feedbackDetails = feedbackDetails;
    gameState.clashingPairings = clashingPairings;
}

// Update the assessment stars
function updateAssessmentStars() {
    const starsContainer = document.querySelector('.board__assessment__stars');
    if (!starsContainer) {
        console.error(teaLangManager.t('errors.assessmentStarsNotFound'));
        return;
    }

    // Clear existing stars
    starsContainer.innerHTML = '';

    // Add filled stars
    for (let i = 0; i < gameState.rating; i++) {
        const star = document.createElement('span');
        star.textContent = '★';
        starsContainer.appendChild(star);
    }

    // Add empty stars
    for (let i = gameState.rating; i < 5; i++) {
        const star = document.createElement('span');
        star.textContent = '☆';
        starsContainer.appendChild(star);
    }

    // Generate assessment text using language manager
    teaLangManager.generateAssessmentText();
}

// Reset all visual elements
function resetVisuals() {
    // Reset kettle liquid
    const kettleLiquid = document.querySelector('.main__kettle__liquid');
    if (kettleLiquid) {
        kettleLiquid.style.backgroundColor = 'rgba(26, 188, 156, 0.6)';
        kettleLiquid.style.height = '80%';
        kettleLiquid.classList.remove('kettle-boiling');
    }

    // Hide kettle steam
    const kettleSteam = document.querySelector('.main__kettle__steam');
    if (kettleSteam) {
        kettleSteam.style.opacity = '0';
    }

    // Hide cup
    const cup = document.querySelector('.main__cup');
    if (cup) {
        cup.classList.add('hidden');
    }

    // Hide spoon
    const spoon = document.querySelector('.main__spoon');
    if (spoon) {
        spoon.classList.add('hidden');
        spoon.classList.remove('brewing-animation');
    }

    // Reset cup liquid
    const cupLiquid = document.querySelector('.main__cup__liquid');
    if (cupLiquid) {
        cupLiquid.style.height = '0';
    }

    // Reset cup tea leaves
    const teaLeaves = document.querySelector('.main__cup__tea_leaves');
    if (teaLeaves) {
        teaLeaves.style.height = '0';

        // Hide tea leaves
        const leaves = teaLeaves.querySelectorAll('span');
        leaves.forEach(leaf => {
            leaf.style.opacity = '0';
        });
    }

    // Reset cup herbs
    const herbsContainer = document.querySelector('.main__cup__herbs');
    if (herbsContainer) {
        herbsContainer.style.height = '0';
    }

    // Reset cup sweeteners
    const sweetenersContainer = document.querySelector('.main__cup__sweeteners');
    if (sweetenersContainer) {
        sweetenersContainer.style.height = '0';
    }

    // Reset cup steam
    const cupSteam = document.querySelector('.steam-from-cup');
    if (cupSteam) {
        cupSteam.style.opacity = '0';
    }

    // Reset selected tea jar
    document.querySelectorAll('.main__right__tea_jars__jar').forEach(jar => {
        jar.classList.remove('jar-selected');
    });

    // Reset selected herb items
    document.querySelectorAll('.main__right__herbs__item').forEach(item => {
        item.classList.remove('jar-selected');
    });

    // Reset selected sweetener items
    document.querySelectorAll('.main__right__sweeteners__item').forEach(item => {
        item.classList.remove('jar-selected');
    });
}

// Enhanced popup creation with multilingual support
function createTeaSuccessPopup() {
    console.log("Creating tea success popup");

    // Check if popup already exists
    if (document.getElementById('tea-success-popup')) {
        return;
    }

    // Create popup overlay
    const overlay = document.createElement('div');
    overlay.id = 'tea-popup-overlay';
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(3px)',
        zIndex: '1000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    });

    // Create popup container
    const popup = document.createElement('div');
    popup.id = 'tea-success-popup';
    Object.assign(popup.style, {
        width: '400px',
        maxWidth: '90%',
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        padding: '30px',
        textAlign: 'center',
        position: 'relative',
        border: '3px solid #d6c09c',
        animation: 'teaPopupFadeIn 0.5s ease-out'
    });

    // Handle RTL for Hebrew
    if (teaLangManager.currentLanguage === 'he') {
        popup.style.direction = 'rtl';
    }

    // Get the star rating for the message
    const stars = gameState.rating || 0;
    let teaQuality = teaLangManager.t('popup.perfectTea');

    if (stars === 5) {
        teaQuality = teaLangManager.t('popup.perfectTea');
    } else if (stars === 4) {
        teaQuality = teaLangManager.t('popup.excellentTea');
    } else if (stars === 3) {
        teaQuality = teaLangManager.t('popup.goodTea');
    } else {
        teaQuality = teaLangManager.t('popup.decentTea');
    }

    // Create popup content
    popup.innerHTML = `
    <style>
      @keyframes teaPopupFadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes starGlow {
        0% { text-shadow: 0 0 5px rgba(214, 192, 156, 0.5); }
        50% { text-shadow: 0 0 20px rgba(214, 192, 156, 0.8); }
        100% { text-shadow: 0 0 5px rgba(214, 192, 156, 0.5); }
      }
      .tea-popup-stars {
        color: #d6c09c;
        font-size: 32px;
        margin: 15px 0;
        animation: starGlow 2s infinite;
      }
      .tea-popup-button {
        background-color: #d6c09c;
        color: white;
        border: none;
        padding: 12px 20px;
        margin: 10px;
        border-radius: 25px;
        font-family: 'Playfair Display', serif;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      }
      .tea-popup-button:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.2);
      }
      .tea-popup-button.secondary {
        background-color: #f5f5f5;
        color: #2e3238;
        border: 2px solid #d6c09c;
      }
      .double-border {
        position: absolute;
        top: -8px;
        left: -8px;
        right: -8px;
        bottom: -8px;
        border: 2px double #d6c09c;
        border-radius: 18px;
        pointer-events: none;
      }
    </style>
    <div class="double-border"></div>
    <h2 style="color:#d6c09c;font-family:'Playfair Display',serif;font-size:24px;margin-top:0;">${stars >= 4 ? teaLangManager.t('popup.wonderfulTea') : teaLangManager.t('popup.goodEnoughTea')}</h2>
    <p style="margin:15px 0;font-family:'Playfair Display',serif;">${teaLangManager.t('popup.youveBrewed')} ${teaQuality} ${teaLangManager.t('popup.cupOfTeaWith')}</p>
    <div class="tea-popup-stars">${'★'.repeat(stars)}${'☆'.repeat(5-stars)}</div>
    <p style="margin:15px 0;font-family:'Playfair Display',serif;font-style:italic;color:#666;">${teaLangManager.t('popup.whatWouldYouLike')}</p>
    <div style="display:flex;justify-content:center;margin-top:20px;">
      <button id="tea-popup-continue" class="tea-popup-button secondary">${teaLangManager.t('popup.continueBrewing')}</button>
      <button id="tea-popup-dani" class="tea-popup-button">${teaLangManager.t('popup.backToDani')}</button>
    </div>
  `;

    // Add popup to the page
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Add event listeners
    document.getElementById('tea-popup-continue').addEventListener('click', function() {
        // Remove the popup
        document.getElementById('tea-popup-overlay').remove();
    });

    document.getElementById('tea-popup-dani').addEventListener('click', function() {
        // Navigate to BrideQuestAfterTea.html
        window.location.href = '../BrideQuestAfterTea.html';

        // Remove the popup
        document.getElementById('tea-popup-overlay').remove();
    });
}

// Modify the updateAssessmentStars function to show the popup when tea is assessed
const originalUpdateAssessmentStars = updateAssessmentStars;
updateAssessmentStars = function() {
    // Call the original function first
    originalUpdateAssessmentStars.apply(this, arguments);

    // Add a delay to ensure the assessment is shown first
    setTimeout(function() {
        // Only show popup for 3+ stars
        if (gameState.rating >= 3) {
            createTeaSuccessPopup();
        }
    }, 1500);
};

// Tea Game Navigation Fix with Multilingual Support
document.addEventListener('DOMContentLoaded', function() {
    console.log("Tea game navigation fix loaded");

    // Function to modify the popup button when it appears
    function modifyTeaPopupButton() {
        // Check every 500ms for the popup button
        const buttonChecker = setInterval(function() {
            const daniButton = document.getElementById('tea-popup-dani');

            if (daniButton) {
                console.log("Found Back to Dani button, modifying it");

                // Clear the interval once we've found the button
                clearInterval(buttonChecker);

                // Replace the click handler with direct navigation
                daniButton.onclick = function() {
                    console.log("Back to Dani button clicked");
                    window.location.href = '../BrideQuestAfterTea.html';
                    return false;
                };
            }
        }, 500);

        // Stop checking after 30 seconds to avoid infinite loops
        setTimeout(function() {
            clearInterval(buttonChecker);
        }, 30000);
    }

    // Override the createTeaSuccessPopup function if it exists
    if (typeof createTeaSuccessPopup === 'function') {
        const originalCreatePopup = createTeaSuccessPopup;

        window.createTeaSuccessPopup = function() {
            // Call the original function to create the popup
            originalCreatePopup();

            // Schedule button modification
            setTimeout(function() {
                const daniButton = document.getElementById('tea-popup-dani');
                if (daniButton) {
                    daniButton.onclick = function() {
                        window.location.href = '../BrideQuestAfterTea.html';
                        return false;
                    };
                    console.log("Modified Back to Dani button in popup");
                }
            }, 100);
        };
    }

    // Call button modification immediately and also after a delay
    modifyTeaPopupButton();
    setTimeout(modifyTeaPopupButton, 2000);

    // Also create a global function that can be called from anywhere
    window.goBackToDani = function() {
        window.location.href = '../BrideQuestAfterTea.html';
    };

    // If assessment already exists when this script loads, try to show popup
    setTimeout(function() {
        const assessmentSection = document.querySelector('.board__assessment');
        const assessmentStars = document.querySelector('.board__assessment__stars');

        if (assessmentSection && !assessmentSection.classList.contains('hidden') &&
            assessmentStars && assessmentStars.textContent.includes('★')) {

            // Create popup if it doesn't exist
            if (typeof createTeaSuccessPopup === 'function' && !document.getElementById('tea-success-popup')) {
                createTeaSuccessPopup();
            }

            // Start button modification
            modifyTeaPopupButton();
        }
    }, 1000);
});// Tea Simulator Game Logic - Multilingual Version
// Translations for the Tea Simulator
const teaTranslations = {
    en: {
        // Console messages
        gameLoaded: "Game logic loaded - waiting for DOM elements",
        gameInitializing: "Initializing game logic...",
        gameInitComplete: "Game initialization complete",
        startButtonSetup: "Setting up start button",
        startButtonClicked: "Start button clicked",
        teaSelectionSetup: "Setting up tea selection buttons",
        herbsSelectionSetup: "Setting up herb selection buttons",
        sweetenersSelectionSetup: "Setting up sweetener selection buttons",
        temperatureSetup: "Setting up temperature controls",
        timeSelectionSetup: "Setting up brewing time buttons",
        resetButtonSetup: "Setting up reset button",

        // Game actions
        selectedTea: "Selected tea",
        addedHerb: "Added herb",
        removedHerb: "Removed herb",
        addedSweetener: "Added sweetener",
        removedSweetener: "Removed sweetener",
        selectedBrewingTime: "Selected brewing time",
        startingBrewing: "Starting brewing for",
        minutes: "minutes",
        visualizingTea: "Visualizing tea",
        visualizingHerbs: "Visualizing herbs",
        visualizingSweeteners: "Visualizing sweeteners",
        visualizingTemperature: "Visualizing temperature",
        calculatedRating: "Calculated rating",
        starsWithFeedback: "stars with feedback",
        resettingGame: "Resetting game",
        showingSection: "Showing section",

        // Temperature display
        fahrenheit: "°F",
        celsius: "°C",

        // Assessment feedback - positive elements
        feedback: {
            impeccableTemperature: "impeccable temperature",
            perfectSteepingTime: "perfect steeping time",
            robustSteeping: "robust steeping",
            lighterSteeping: "lighter steeping",
            classicHerbPairing: "classic herb pairing",
            aromaticComplex: "aromatic but complex spice blend",
            traditionalSweetening: "traditional sweetening",
            classicUnsweetened: "classic unsweetened presentation",
            preciseTemperature: "precise temperature",
            acceptableTemperature: "acceptable temperature",
            perfectSteepingDuration: "perfect steeping duration",
            harmonious: "harmonious herb pairing",
            pureAppreciation: "pure tea appreciation",
            subtleSweetening: "subtle sweetening",
            authenticUnsweetened: "authentic unsweetened presentation",
            idealTemperature: "ideal temperature",
            preciseSteepingTime: "precise steeping time",
            unadulteratedElegance: "unadulterated elegance",
            pureExpression: "pure expression of the tea's natural sweetness",
            optimalTemperature: "optimal temperature",
            suitableTemperature: "suitable temperature",
            extendedSteep: "extended steep yielding deeper flavors",
            harmonousAccent: "harmonious accent",
            respectForTea: "respect for the tea's natural character",
            subtleHoney: "subtle honey complement",
            perfectExtraction: "perfect temperature for full extraction",
            goodTemperature: "good temperature",
            idealSteepingDuration: "ideal steeping duration",
            masterfuHerbs: "masterful herb combination",
            interestingBlend: "interesting herb blend",
            simpleEffective: "simple but effective infusion",
            perfectHoney: "perfect honey complement",
            pleasantSweetness: "pleasant sweetness"
        },

        // Assessment feedback - negative elements (clashing pairings)
        clashing: {
            waterTooCool: "water too cool for proper extraction",
            insufficientSteeping: "insufficient steeping",
            mintBlackTea: "mint with black tea creates an unpleasant astringency",
            unconventionalSweetener: "unconventional sweetener that competes with the tea's character",
            excessiveSweetness: "excessive sweetness masks the tea's complexity",
            slightlyTooWarm: "slightly too warm",
            excessiveHeat: "excessive heat has scorched the delicate leaves",
            slightOverSteeping: "slight over-steeping leading to bitterness",
            severeOverSteeping: "severe over-steeping resulting in astringency",
            overpoweringHerbs: "overpowering herbs that mask the tea's subtlety",
            tooManyFlavors: "too many competing flavors",
            overwhelmingSweetener: "sweetener that overwhelms the tea's delicate notes",
            excessiveSweetnessSubtle: "excessive sweetness destroys the tea's subtlety",
            slightlyTooWarmWater: "slightly too warm water",
            excessiveHeatDamage: "excessive heat has damaged the tea's subtle character",
            slightOverSteepingClarity: "slight over-steeping affecting clarity",
            excessiveSteepingTime: "excessive steeping time",
            additionsMasking: "additions masking the tea's exquisite subtlety",
            sweetenerConcealing: "sweetener concealing the tea's delicate honeyed notes",
            waterTooHot: "water too hot for the tea's complexity",
            insufficientSteepingTime: "insufficient steeping time",
            competingHerb: "herb that competes with the tea's fruity and floral notes",
            excessiveSweetenersMasking: "excessive sweeteners masking the tea's intrinsic qualities",
            insufficientHeat: "insufficient heat for proper infusion",
            severelyUnderdeveloped: "severely under-developed flavor",
            discordantFlavors: "create a discordant flavor profile",
            overSweetened: "over-sweetened",
            lacksHerbalCharacter: "lacks herbal character"
        },

        // Perfect tea descriptions
        perfectTea: {
            londonFinest: "served as in London's finest tea rooms",
            kyotoWorthy: "prepared with Kyoto-worthy precision",
            chineseCeremony: "prepared with the reverence of a Chinese tea ceremony",
            taiwanesePrecision: "prepared with Taiwanese Gong Fu precision",
            royalGarden: "worthy of presentation at a royal garden party"
        },

        // Star ratings and feedback
        assessment: {
            fiveStars: "5★ Perfection! The bride is utterly delighted with your exquisite brewing.",
            fourStars: "4★ Most impressive! The bride appears considerably more at ease.",
            threeStars: "3★ A decent effort. The bride sips with a thoughtful expression.",
            twoStars: "2★ The bride seems rather uncertain about this blend.",
            oneStar: "1★ With the utmost courtesy, the bride sets the cup aside after a single sip. Perhaps an entirely different approach would better suit her refined tastes.",

            sheParticularlyImpressed: "She is particularly impressed by the",
            sheAppreciates: "She appreciates the",
            sheAcknowledges: "She acknowledges the",
            thoughNotes: "Though notes that the",
            however: "However, she finds that the",
            gentlySuggests: "She gently suggests that the",
            thoughAppreciates: "Though she does appreciate the",
            politelyMentions: "She politely mentions that the",

            and: "and",
            the: "the"
        },

        // Popup messages
        popup: {
            wonderfulTea: "Wonderful Tea!",
            goodEnoughTea: "Good Enough Tea!",
            youveBrewed: "You've brewed a",
            perfectTea: "perfect",
            excellentTea: "excellent",
            goodTea: "good",
            decentTea: "decent",
            cupOfTeaWith: "cup of tea with:",
            whatWouldYouLike: "What would you like to do next?",
            continueBrewing: "Continue Brewing",
            backToDani: "Back to Dani",

            debugSimulate: "Debug: Simulate Good Tea",
            debugCheck: "Debug: Check Iframe",
            returnToDani: "RETURN TO DANI"
        },

        // Error messages
        errors: {
            startButtonNotFound: "Start button not found",
            teaSelectionNotFound: "Tea selection buttons not found",
            herbSelectionNotFound: "Herb selection buttons not found",
            sweetenerSelectionNotFound: "Sweetener selection buttons not found",
            temperatureControlsNotFound: "Temperature controls not found",
            brewingTimeNotFound: "Brewing time buttons not found",
            resetButtonNotFound: "Reset button not found",
            assessmentStarsNotFound: "Assessment stars container not found",
            requiredElementsNotFound: "Required elements not found",
            noMatchingButton: "No matching button found for",
            shelfItemsNotFound: "Shelf items container not found",
            shelfElementNotFound: "Shelf element not found"
        }
    },

    ru: {
        // Console messages
        gameLoaded: "Логика игры загружена - ожидание элементов DOM",
        gameInitializing: "Инициализация логики игры...",
        gameInitComplete: "Инициализация игры завершена",
        startButtonSetup: "Настройка кнопки старт",
        startButtonClicked: "Кнопка старт нажата",
        teaSelectionSetup: "Настройка кнопок выбора чая",
        herbsSelectionSetup: "Настройка кнопок выбора трав",
        sweetenersSelectionSetup: "Настройка кнопок выбора подсластителей",
        temperatureSetup: "Настройка контроля температуры",
        timeSelectionSetup: "Настройка кнопок времени заваривания",
        resetButtonSetup: "Настройка кнопки сброса",

        // Game actions
        selectedTea: "Выбран чай",
        addedHerb: "Добавлена трава",
        removedHerb: "Убрана трава",
        addedSweetener: "Добавлен подсластитель",
        removedSweetener: "Убран подсластитель",
        selectedBrewingTime: "Выбрано время заваривания",
        startingBrewing: "Начинаем заваривание на",
        minutes: "минут",
        visualizingTea: "Визуализация чая",
        visualizingHerbs: "Визуализация трав",
        visualizingSweeteners: "Визуализация подсластителей",
        visualizingTemperature: "Визуализация температуры",
        calculatedRating: "Вычисленный рейтинг",
        starsWithFeedback: "звёзд с отзывом",
        resettingGame: "Сброс игры",
        showingSection: "Показ раздела",

        // Temperature display
        fahrenheit: "°F",
        celsius: "°C",

        // Assessment feedback - positive elements
        feedback: {
            impeccableTemperature: "безупречная температура",
            perfectSteepingTime: "идеальное время заваривания",
            robustSteeping: "насыщенное заваривание",
            lighterSteeping: "лёгкое заваривание",
            classicHerbPairing: "классическое сочетание трав",
            aromaticComplex: "ароматная, но сложная смесь специй",
            traditionalSweetening: "традиционное подслащивание",
            classicUnsweetened: "классическая подача без сахара",
            preciseTemperature: "точная температура",
            acceptableTemperature: "приемлемая температура",
            perfectSteepingDuration: "идеальная продолжительность заваривания",
            harmonious: "гармоничное сочетание трав",
            pureAppreciation: "чистое наслаждение чаем",
            subtleSweetening: "тонкое подслащивание",
            authenticUnsweetened: "аутентичная подача без сахара",
            idealTemperature: "идеальная температура",
            preciseSteepingTime: "точное время заваривания",
            unadulteratedElegance: "неразбавленная элегантность",
            pureExpression: "чистое выражение естественной сладости чая",
            optimalTemperature: "оптимальная температура",
            suitableTemperature: "подходящая температура",
            extendedSteep: "продолжительное заваривание для глубокого вкуса",
            harmonousAccent: "гармоничный акцент",
            respectForTea: "уважение к естественному характеру чая",
            subtleHoney: "тонкое дополнение мёда",
            perfectExtraction: "идеальная температура для полной экстракции",
            goodTemperature: "хорошая температура",
            idealSteepingDuration: "идеальная продолжительность заваривания",
            masterfuHerbs: "мастерское сочетание трав",
            interestingBlend: "интересная смесь трав",
            simpleEffective: "простой, но эффективный настой",
            perfectHoney: "идеальное дополнение мёда",
            pleasantSweetness: "приятная сладость"
        },

        // Assessment feedback - negative elements
        clashing: {
            waterTooCool: "вода слишком холодная для правильной экстракции",
            insufficientSteeping: "недостаточное заваривание",
            mintBlackTea: "мята с чёрным чаем создаёт неприятную терпкость",
            unconventionalSweetener: "нетрадиционный подсластитель конкурирует с характером чая",
            excessiveSweetness: "чрезмерная сладость маскирует сложность чая",
            slightlyTooWarm: "слегка слишком тёплая",
            excessiveHeat: "чрезмерный жар опалил нежные листья",
            slightOverSteeping: "лёгкое переваривание, ведущее к горечи",
            severeOverSteeping: "сильное переваривание, приводящее к терпкости",
            overpoweringHerbs: "подавляющие травы маскируют тонкость чая",
            tooManyFlavors: "слишком много конкурирующих вкусов",
            overwhelmingSweetener: "подсластитель подавляет нежные ноты чая",
            excessiveSweetnessSubtle: "чрезмерная сладость разрушает тонкость чая",
            slightlyTooWarmWater: "слегка слишком тёплая вода",
            excessiveHeatDamage: "чрезмерный жар повредил тонкий характер чая",
            slightOverSteepingClarity: "лёгкое переваривание влияет на прозрачность",
            excessiveSteepingTime: "чрезмерное время заваривания",
            additionsMasking: "добавки маскируют изысканную тонкость чая",
            sweetenerConcealing: "подсластитель скрывает нежные медовые ноты чая",
            waterTooHot: "вода слишком горячая для сложности чая",
            insufficientSteepingTime: "недостаточное время заваривания",
            competingHerb: "трава конкурирует с фруктовыми и цветочными нотами чая",
            excessiveSweetenersMasking: "чрезмерные подсластители маскируют внутренние качества чая",
            insufficientHeat: "недостаточный жар для правильного настаивания",
            severelyUnderdeveloped: "сильно недоразвитый вкус",
            discordantFlavors: "создают диссонансный вкусовой профиль",
            overSweetened: "пересахаренный",
            lacksHerbalCharacter: "не хватает травяного характера"
        },

        // Perfect tea descriptions
        perfectTea: {
            londonFinest: "подан как в лучших чайных Лондона",
            kyotoWorthy: "приготовлен с точностью, достойной Киото",
            chineseCeremony: "приготовлен с почтением китайской чайной церемонии",
            taiwanesePrecision: "приготовлен с тайваньской точностью Гун Фу",
            royalGarden: "достоин подачи на королевском приёме в саду"
        },

        // Star ratings and feedback
        assessment: {
            fiveStars: "5★ Совершенство! Невеста в восторге от вашего мастерского заваривания.",
            fourStars: "4★ Очень впечатляюще! Невеста выглядит значительно спокойнее.",
            threeStars: "3★ Приличная попытка. Невеста задумчиво потягивает чай.",
            twoStars: "2★ Невеста кажется довольно неуверенной в отношении этой смеси.",
            oneStar: "1★ С величайшей учтивостью невеста отставляет чашку после одного глотка. Возможно, совершенно другой подход лучше подошёл бы её утончённому вкусу.",

            sheParticularlyImpressed: "Она особенно впечатлена",
            sheAppreciates: "Она ценит",
            sheAcknowledges: "Она признаёт",
            thoughNotes: "Хотя отмечает, что",
            however: "Однако, она считает, что",
            gentlySuggests: "Она мягко предлагает, что",
            thoughAppreciates: "Хотя она ценит",
            politelyMentions: "Она вежливо упоминает, что",

            and: "и",
            the: ""
        },

        // Popup messages
        popup: {
            wonderfulTea: "Чудесный чай!",
            goodEnoughTea: "Достаточно хороший чай!",
            youveBrewed: "Вы заварили",
            perfectTea: "идеальную",
            excellentTea: "превосходную",
            goodTea: "хорошую",
            decentTea: "приличную",
            cupOfTeaWith: "чашку чая с:",
            whatWouldYouLike: "Что бы вы хотели сделать дальше?",
            continueBrewing: "Продолжить заваривание",
            backToDani: "Вернуться к Дане",

            debugSimulate: "Отладка: Симулировать хороший чай",
            debugCheck: "Отладка: Проверить фрейм",
            returnToDani: "ВЕРНУТЬСЯ К ДАНЕ"
        },

        // Error messages
        errors: {
            startButtonNotFound: "Кнопка старт не найдена",
            teaSelectionNotFound: "Кнопки выбора чая не найдены",
            herbSelectionNotFound: "Кнопки выбора трав не найдены",
            sweetenerSelectionNotFound: "Кнопки выбора подсластителей не найдены",
            temperatureControlsNotFound: "Контроли температуры не найдены",
            brewingTimeNotFound: "Кнопки времени заваривания не найдены",
            resetButtonNotFound: "Кнопка сброса не найдена",
            assessmentStarsNotFound: "Контейнер звёзд оценки не найден",
            requiredElementsNotFound: "Необходимые элементы не найдены",
            noMatchingButton: "Соответствующая кнопка не найдена для",
            shelfItemsNotFound: "Контейнер элементов полки не найден",
            shelfElementNotFound: "Элемент полки не найден"
        }
    },

    he: {
        // Console messages
        gameLoaded: "לוגיקת המשחק נטענה - ממתין לרכיבי DOM",
        gameInitializing: "מאתחל לוגיקת משחק...",
        gameInitComplete: "אתחול המשחק הושלם",
        startButtonSetup: "הגדרת כפתור התחלה",
        startButtonClicked: "כפתור התחלה נלחץ",
        teaSelectionSetup: "הגדרת כפתורי בחירת תה",
        herbsSelectionSetup: "הגדרת כפתורי בחירת עשבי תיבול",
        sweetenersSelectionSetup: "הגדרת כפתורי בחירת ממתיקים",
        temperatureSetup: "הגדרת בקרת טמפרטורה",
        timeSelectionSetup: "הגדרת כפתורי זמן חליטה",
        resetButtonSetup: "הגדרת כפתור איפוס",

        // Game actions
        selectedTea: "תה נבחר",
        addedHerb: "עשב תיבול נוסף",
        removedHerb: "עשב תיבול הוסר",
        addedSweetener: "ממתיק נוסף",
        removedSweetener: "ממתיק הוסר",
        selectedBrewingTime: "זמן חליטה נבחר",
        startingBrewing: "מתחיל חליטה למשך",
        minutes: "דקות",
        visualizingTea: "מציג תה",
        visualizingHerbs: "מציג עשבי תיבול",
        visualizingSweeteners: "מציג ממתיקים",
        visualizingTemperature: "מציג טמפרטורה",
        calculatedRating: "דירוג מחושב",
        starsWithFeedback: "כוכבים עם משוב",
        resettingGame: "מאפס משחק",
        showingSection: "מציג קטע",

        // Temperature display
        fahrenheit: "°F",
        celsius: "°C",

        // Assessment feedback - positive elements
        feedback: {
            impeccableTemperature: "טמפרטורה מושלמת",
            perfectSteepingTime: "זמן חליטה מושלם",
            robustSteeping: "חליטה עשירה",
            lighterSteeping: "חליטה קלילה",
            classicHerbPairing: "שילוב עשבי תיבול קלאסי",
            aromaticComplex: "תערובת תבלינים ארומטית אך מורכבת",
            traditionalSweetening: "ממתיק מסורתי",
            classicUnsweetened: "הגשה קלאסית ללא ממתיק",
            preciseTemperature: "טמפרטורה מדויקת",
            acceptableTemperature: "טמפרטורה מקובלת",
            perfectSteepingDuration: "משך חליטה מושלם",
            harmonious: "שילוב הרמוני של עשבי תיבול",
            pureAppreciation: "הערכה טהורה של התה",
            subtleSweetening: "ממתיק עדין",
            authenticUnsweetened: "הגשה אותנטית ללא ממתיק",
            idealTemperature: "טמפרטורה אידיאלית",
            preciseSteepingTime: "זמן חליטה מדויק",
            unadulteratedElegance: "אלגנטיות לא מזוייפת",
            pureExpression: "ביטוי טהור של המתיקות הטבעית של התה",
            optimalTemperature: "טמפרטורה אופטימלית",
            suitableTemperature: "טמפרטורה מתאימה",
            extendedSteep: "חליטה מורחבת לטעמים עמוקים",
            harmonousAccent: "הדגשה הרמונית",
            respectForTea: "כבוד לאופי הטבעי של התה",
            subtleHoney: "השלמת דבש עדינה",
            perfectExtraction: "טמפרטורה מושלמת לחליצה מלאה",
            goodTemperature: "טמפרטורה טובה",
            idealSteepingDuration: "משך חליטה אידיאלי",
            masterfuHerbs: "שילוב מופתי של עשבי תיבול",
            interestingBlend: "תערובת עשבי תיבול מעניינת",
            simpleEffective: "חליטה פשוטה אך יעילה",
            perfectHoney: "השלמת דבש מושלמת",
            pleasantSweetness: "מתיקות נעימה"
        },

        // Assessment feedback - negative elements
        clashing: {
            waterTooCool: "מים קרים מדי לחליטה נכונה",
            insufficientSteeping: "חליטה לא מספקת",
            mintBlackTea: "נענע עם תה שחור יוצר מרירות לא נעימה",
            unconventionalSweetener: "ממתיק לא מסורתי שמתחרה באופי התה",
            excessiveSweetness: "מתיקות מוגזמת מסווה את המורכבות של התה",
            slightlyTooWarm: "חם מעט מדי",
            excessiveHeat: "חום מוגזם צרב את העלים",
            slightOverSteeping: "חליטה יותר קלה מובילה למרירות",
            severeOverSteeping: "חליטה יתר חמורה המביאה למרירות",
            overpoweringHerbs: "עשבי תיבול דומיננטיים שמסווים את העדינות של התה",
            tooManyFlavors: "יותר מדי טעמים מתחרים",
            overwhelmingSweetener: "ממתיק שמכריע את הנתונים העדינים של התה",
            excessiveSweetnessSubtle: "מתיקות מוגזמת הורסת את העדינות של התה",
            slightlyTooWarmWater: "מים חמים מעט מדי",
            excessiveHeatDamage: "חום מוגזם פגע באופי העדין של התה",
            slightOverSteepingClarity: "חליטה יותר קלה משפיעה על הצלילות",
            excessiveSteepingTime: "זמן חליטה מוגזם",
            additionsMasking: "תוספות שמסווים את העדינות המעולה של התה",
            sweetenerConcealing: "ממתיק שמסתיר את הנותים הדבשיים העדינים של התה",
            waterTooHot: "מים חמים מדי למורכבות התה",
            insufficientSteepingTime: "זמן חליטה לא מספק",
            competingHerb: "עשב תיבול שמתחרה בנתוני הפרי והפרחוניות של התה",
            excessiveSweetenersMasking: "ממתיקים מוגזמים מסווים את האיכויות הפנימיות של התה",
            insufficientHeat: "חום לא מספק לחליטה נכונה",
            severelyUnderdeveloped: "טעם לא מפותח",
            discordantFlavors: "יוצרים פרופיל טעם לא הרמונלי",
            overSweetened: "ממותק יתר על המידה",
            lacksHerbalCharacter: "חסר אופי צמחי"
        },

        // Perfect tea descriptions
        perfectTea: {
            londonFinest: "מוגש כמו בבתי התה המשובחים של לונדון",
            kyotoWorthy: "מוכן בדיוק הראוי לקיוטו",
            chineseCeremony: "מוכן ברוח הכבוד של טקס התה הסיני",
            taiwanesePrecision: "מוכן בדיוק הטייוואני גונג פו",
            royalGarden: "ראוי להגשה בקבלת פנים מלכותית בגן"
        },

        // Star ratings and feedback
        assessment: {
            fiveStars: "5★ מושלם! הכלה מתרגשת מהחליטה המופתית שלך.",
            fourStars: "4★ מרשים ביותר! הכלה נראית רגועה הרבה יותר.",
            threeStars: "3★ מאמץ הגון. הכלה לוגמת במחשבה.",
            twoStars: "2★ הכלה נראית די לא בטוחה לגבי התערובת הזו.",
            oneStar: "1★ בנימוס גדול, הכלה מניחה את הכוס בצד אחרי לגימה אחת. אולי גישה שונה לחלוטין תתאים יותר לטעמה המעודן.",

            sheParticularlyImpressed: "היא מתרשמת במיוחד מ",
            sheAppreciates: "היא מעריכה את",
            sheAcknowledges: "היא מכירה ב",
            thoughNotes: "אם כי מעירה ש",
            however: "עם זאת, היא מוצאת ש",
            gentlySuggests: "היא מציעה בעדינות ש",
            thoughAppreciates: "אם כי היא מעריכה את",
            politelyMentions: "היא מזכירה בנימוס ש",

            and: "ו",
            the: "ה"
        },

        // Popup messages
        popup: {
            wonderfulTea: "תה נפלא!",
            goodEnoughTea: "תה טוב דיו!",
            youveBrewed: "חלטת",
            perfectTea: "מושלמת",
            excellentTea: "מעולה",
            goodTea: "טובה",
            decentTea: "הגונה",
            cupOfTeaWith: "כוס תה עם:",
            whatWouldYouLike: "מה תרצה לעשות הלאה?",
            continueBrewing: "להמשיך לחלוט",
            backToDani: "חזרה לדני",

            debugSimulate: "דיבאג: סימולציה של תה טוב",
            debugCheck: "דיבאג: בדיקת מסגרת",
            returnToDani: "חזרה לדני"
        },

        // Error messages
        errors: {
            startButtonNotFound: "כפתור התחלה לא נמצא",
            teaSelectionNotFound: "כפתורי בחירת תה לא נמצאו",
            herbSelectionNotFound: "כפתורי בחירת עשבי תיבול לא נמצאו",
            sweetenerSelectionNotFound: "כפתורי בחירת ממתיקים לא נמצאו",
            temperatureControlsNotFound: "בקרי טמפרטורה לא נמצאו",
            brewingTimeNotFound: "כפתורי זמן חליטה לא נמצאו",
            resetButtonNotFound: "כפתור איפוס לא נמצא",
            assessmentStarsNotFound: "מכל כוכבי הערכה לא נמצא",
            requiredElementsNotFound: "רכיבים נדרשים לא נמצאו",
            noMatchingButton: "כפתור תואם לא נמצא עבור",
            shelfItemsNotFound: "מכל פריטי מדף לא נמצא",
            shelfElementNotFound: "רכיב מדף לא נמצא"
        }
    }
};

// Language management for Tea Simulator
class TeaLanguageManager {
    constructor() {
        this.currentLanguage = this.getCurrentLanguage();
        this.translations = teaTranslations;
        this.setupLanguageListener();
    }

    getCurrentLanguage() {
        // Try to get language from parent window first
        try {
            if (window.parent && window.parent.langManager) {
                return window.parent.langManager.getCurrentLanguage();
            }
        } catch (e) {
            console.log("Cannot access parent window language manager");
        }

        // Fallback to sessionStorage
        return sessionStorage.getItem('wedding-language') || 'en';
    }

    setupLanguageListener() {
        // Listen for storage changes
        window.addEventListener('storage', (e) => {
            if (e.key === 'wedding-language') {
                this.switchLanguage(e.newValue);
            }
        });

        // Listen for custom events from parent
        window.addEventListener('message', (e) => {
            if (e.data && e.data.type === 'languageChanged') {
                this.switchLanguage(e.data.language);
            }
        });

        // Check for language changes periodically
        setInterval(() => {
            const newLang = this.getCurrentLanguage();
            if (newLang !== this.currentLanguage) {
                this.switchLanguage(newLang);
            }
        }, 1000);
    }

    switchLanguage(newLanguage) {
        if (newLanguage && newLanguage !== this.currentLanguage) {
            this.currentLanguage = newLanguage;
            this.updateAllText();

            // Update RTL for Hebrew
            if (newLanguage === 'he') {
                document.body.style.direction = 'rtl';
                document.body.classList.add('rtl');
            } else {
                document.body.style.direction = 'ltr';
                document.body.classList.remove('rtl');
            }
        }
    }

    t(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLanguage];

        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                // Fallback to English
                value = this.translations.en;
                for (const fallbackKey of keys) {
                    if (value && value[fallbackKey]) {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key if not found
                    }
                }
                break;
            }
        }

        return value || key;
    }

    updateAllText() {
        // Update any existing dynamic text elements
        this.updateTemperatureDisplay();
        this.updateAssessmentText();
        this.updatePopupText();
    }

    updateTemperatureDisplay() {
        const tempValue = document.querySelector('.temperature-value');
        if (tempValue && gameState.temperature) {
            const temp = gameState.temperature;
            const tempC = Math.round((temp - 32) * 5 / 9);
            tempValue.textContent = `${temp}${this.t('fahrenheit')} (${tempC}${this.t('celsius')})`;
        }
    }

    updateAssessmentText() {
        const assessmentText = document.querySelector('.board__assessment__text p');
        if (assessmentText && gameState.rating) {
            this.generateAssessmentText();
        }
    }

    updatePopupText() {
        const popup = document.getElementById('tea-success-popup');
        if (popup) {
            this.updateExistingPopup();
        }
    }

    updateExistingPopup() {
        const popup = document.getElementById('tea-success-popup');
        if (!popup) return;

        const stars = gameState.rating || 0;
        let teaQuality = this.t('popup.perfectTea');

        if (stars === 5) {
            teaQuality = this.t('popup.perfectTea');
        } else if (stars === 4) {
            teaQuality = this.t('popup.excellentTea');
        } else if (stars === 3) {
            teaQuality = this.t('popup.goodTea');
        } else {
            teaQuality = this.t('popup.decentTea');
        }

        const title = popup.querySelector('h2');
        if (title) {
            title.textContent = stars >= 4 ? this.t('popup.wonderfulTea') : this.t('popup.goodEnoughTea');
        }

        const description = popup.querySelector('p');
        if (description) {
            description.textContent = `${this.t('popup.youveBrewed')} ${teaQuality} ${this.t('popup.cupOfTeaWith')}`;
        }

        const question = popup.querySelectorAll('p')[1];
        if (question) {
            question.textContent = this.t('popup.whatWouldYouLike');
        }

        const continueBtn = document.getElementById('tea-popup-continue');
        if (continueBtn) {
            continueBtn.textContent = this.t('popup.continueBrewing');
        }

        const daniBtn = document.getElementById('tea-popup-dani');
        if (daniBtn) {
            daniBtn.textContent = this.t('popup.backToDani');
        }
    }

    generateAssessmentText() {
        const assessmentText = document.querySelector('.board__assessment__text p');
        if (!assessmentText) return;

        const feedbackDetails = gameState.feedbackDetails || [];
        const clashingPairings = gameState.clashingPairings || [];
        let feedback = "";

        // Filter to get just positive feedback
        const positiveFeedback = feedbackDetails.filter(item => !clashingPairings.includes(item));

        switch (gameState.rating) {
            case 5:
                feedback = this.t('assessment.fiveStars') + " ";
                if (positiveFeedback.length > 0) {
                    feedback += this.t('assessment.sheParticularlyImpressed') + " " +
                        this.translateFeedbackArray(positiveFeedback) + ".";
                }
                break;
            case 4:
                feedback = this.t('assessment.fourStars') + " ";
                if (positiveFeedback.length > 0) {
                    feedback += this.t('assessment.sheAppreciates') + " " +
                        this.translateFeedbackArray(positiveFeedback) + ".";
                }
                if (clashingPairings.length > 0) {
                    feedback += " " + this.t('assessment.thoughNotes') + " " +
                        this.translateClashingFeedback(clashingPairings[0]) + ".";
                }
                break;
            case 3:
                feedback = this.t('assessment.threeStars') + " ";
                if (positiveFeedback.length > 0) {
                    feedback += this.t('assessment.sheAcknowledges') + " " +
                        this.translateFeedbackArray(positiveFeedback.slice(0, 2)) + ".";
                }
                if (clashingPairings.length > 0) {
                    feedback += " " + this.t('assessment.however') + " " +
                        this.translateClashingFeedback(clashingPairings.slice(0, 2)) + ".";
                }
                break;
            case 2:
                feedback = this.t('assessment.twoStars') + " ";
                if (clashingPairings.length > 0) {
                    feedback += this.t('assessment.gentlySuggests') + " " +
                        this.translateClashingFeedback(clashingPairings.slice(0, 2)) + ".";
                }
                if (positiveFeedback.length > 0) {
                    feedback += " " + this.t('assessment.thoughAppreciates') + " " +
                        this.translateFeedbackItem(positiveFeedback[0]) + ".";
                }
                break;
            default:
                feedback = this.t('assessment.oneStar');
                if (clashingPairings.length > 0) {
                    feedback += " " + this.t('assessment.politelyMentions') + " " +
                        this.translateClashingFeedback(clashingPairings[0]) + ".";
                }
        }

        assessmentText.textContent = feedback;
    }

    translateFeedbackArray(feedbackArray) {
        if (!feedbackArray || feedbackArray.length === 0) return "";

        const translated = feedbackArray.map(item => this.translateFeedbackItem(item));

        if (translated.length === 1) {
            return translated[0];
        } else if (translated.length === 2) {
            return translated[0] + " " + this.t('assessment.and') + " " + translated[1];
        } else {
            const last = translated.pop();
            return translated.join(", ") + " " + this.t('assessment.and') + " " + last;
        }
    }

    translateFeedbackItem(item) {
        // Check if it's a positive feedback item
        for (const [key, value] of Object.entries(this.translations.en.feedback)) {
            if (value === item) {
                return this.t('feedback.' + key);
            }
        }

        // Check if it's a clashing item
        for (const [key, value] of Object.entries(this.translations.en.clashing)) {
            if (value === item) {
                return this.t('clashing.' + key);
            }
        }

        // Check perfect tea descriptions
        for (const [key, value] of Object.entries(this.translations.en.perfectTea)) {
            if (value === item) {
                return this.t('perfectTea.' + key);
            }
        }

        return item; // Return original if not found
    }

    translateClashingFeedback(clashingArray) {
        if (Array.isArray(clashingArray)) {
            return this.translateFeedbackArray(clashingArray);
        } else {
            return this.translateFeedbackItem(clashingArray);
        }
    }
}

// Initialize language manager
let teaLangManager;

// Modified Tea Simulator Game Logic with Multilingual Support
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language manager first
    teaLangManager = new TeaLanguageManager();

    console.log(teaLangManager.t('gameLoaded'));

    // We'll also listen for the board being loaded via AJAX
    document.addEventListener('boardLoaded', initializeGame);

    // Execute immediately in case DOM is already loaded
    if (document.readyState === 'complete') {
        initializeGame();
    }
});

// Game state
let gameState = {
    teaType: null,
    teaColor: null,
    teaLeaves: null,
    herbs: [],
    sweeteners: [],
    temperature: 195,
    brewingTime: null,
    rating: 0
};

// Initialize game
function initializeGame() {
    console.log(teaLangManager.t('gameInitializing'));

    // Fix Start Brewing button
    setupStartButton();

    // Setup tea selection
    setupTeaSelection();

    // Setup herbs selection
    setupHerbsSelection();

    setTimeout(setupSweetenersSelection, 300);
    // Setup sweeteners selection
    setupSweetenersSelection();

    // Setup temperature controls
    setupTemperatureControls();

    // Setup brewing time selection
    setupTimeSelection();

    // Setup reset button
    setupResetButton();

    // Setup any other necessary event listeners
    console.log(teaLangManager.t('gameInitComplete'));
}

// Set up the start brewing button
function setupStartButton() {
    const startBtn = document.querySelector('.board__welcome__button');
    if (!startBtn) {
        console.error(teaLangManager.t('errors.startButtonNotFound'));
        return;
    }

    console.log(teaLangManager.t('startButtonSetup'));

    // Remove any existing event listeners by cloning
    const newBtn = startBtn.cloneNode(true);
    startBtn.parentNode.replaceChild(newBtn, startBtn);

    // Add new event listener
    newBtn.addEventListener('click', () => {
        console.log(teaLangManager.t('startButtonClicked'));
        showSection('tea_type');
    });
}

// Set up tea selection buttons
function setupTeaSelection() {
    const teaButtons = document.querySelectorAll('.board__tea_type__button');
    if (teaButtons.length === 0) {
        console.error(teaLangManager.t('errors.teaSelectionNotFound'));
        return;
    }

    console.log(teaLangManager.t('teaSelectionSetup'));

    teaButtons.forEach(button => {
        // Remove any existing event listeners by cloning
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);

        // Add new event listener
        newBtn.addEventListener('click', () => {
            const teaType = newBtn.getAttribute('data-tea');
            const teaColor = newBtn.getAttribute('data-color');
            const teaLeaves = newBtn.getAttribute('data-leaves');

            console.log(`${teaLangManager.t('selectedTea')}: ${teaType}, color: ${teaColor}`);

            // Update game state
            gameState.teaType = teaType;
            gameState.teaColor = teaColor;
            gameState.teaLeaves = teaLeaves;

            // Show the herbs section
            showSection('herbs');

            // Visualize the selected tea
            visualizeTeaSelection(teaType, teaColor, teaLeaves);
        });
    });

    // Also allow clicking directly on tea jars to select tea
    const teaJars = document.querySelectorAll('.main__right__tea_jars__jar');
    teaJars.forEach(jar => {
        // Remove any existing event listeners by cloning
        const newJar = jar.cloneNode(true);
        jar.parentNode.replaceChild(newJar, jar);

        // Add new event listener
        newJar.addEventListener('click', () => {
            const teaType = newJar.id.replace('-tea', ''); // Extract tea type from id

            // Find matching button to get the color and leaves data
            const matchingButton = document.querySelector(`.board__tea_type__button[data-tea="${teaType}"]`);
            if (matchingButton) {
                const teaColor = matchingButton.getAttribute('data-color');
                const teaLeaves = matchingButton.getAttribute('data-leaves');

                console.log(`${teaLangManager.t('selectedTea')}: ${teaType}, color: ${teaColor}`);

                // Update game state
                gameState.teaType = teaType;
                gameState.teaColor = teaColor;
                gameState.teaLeaves = teaLeaves;

                // Show the herbs section
                showSection('herbs');

                // Visualize the selected tea
                visualizeTeaSelection(teaType, teaColor, teaLeaves);
            }
        });
    });
}

// Set up herbs selection buttons
function setupHerbsSelection() {
    const herbButtons = document.querySelectorAll('.board__herbs__button');
    if (herbButtons.length === 0) {
        console.error(teaLangManager.t('errors.herbSelectionNotFound'));
        return;
    }

    console.log(teaLangManager.t('herbsSelectionSetup'));

    // Get the actual herb options available in the UI
    const availableHerbs = [];
    herbButtons.forEach(button => {
        const herb = button.getAttribute('data-herb');
        if (herb && herb !== 'none') {
            availableHerbs.push(herb);
        }
    });

    herbButtons.forEach(button => {
        // Remove any existing event listeners by cloning
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);

        // Add new event listener
        newBtn.addEventListener('click', () => {
            const herb = newBtn.getAttribute('data-herb');

            if (herb === 'none') {
                // Continue to sweeteners section when "Continue" is clicked
                showSection('sweeteners');
            } else {
                // Toggle selected class for visual feedback
                newBtn.classList.toggle('selected');

                // Add or remove herb from game state
                if (newBtn.classList.contains('selected')) {
                    // Add herb if not already in the array
                    if (!gameState.herbs.includes(herb)) {
                        gameState.herbs.push(herb);
                        console.log(`${teaLangManager.t('addedHerb')}: ${herb}`);
                    }
                } else {
                    // Remove herb if in the array
                    const index = gameState.herbs.indexOf(herb);
                    if (index !== -1) {
                        gameState.herbs.splice(index, 1);
                        console.log(`${teaLangManager.t('removedHerb')}: ${herb}`);
                    }
                }

                // Visualize herbs in cup
                visualizeHerbs();
            }
        });
    });

    // Also allow clicking directly on herb items to select them
    const herbItems = document.querySelectorAll('.main__right__herbs__item');
    herbItems.forEach(item => {
        // Remove any existing event listeners by cloning
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);

        // Add new event listener
        newItem.addEventListener('click', () => {
            const herbId = newItem.id;

            // Map shelf item ID to board button data attribute if needed
            let matchingHerb = herbId;

            // Special case mapping for items that might have different names
            if (herbId === 'anise') matchingHerb = 'star anise';

            // Find the matching button based on the mapped herb name
            let matchingButton = document.querySelector(`.board__herbs__button[data-herb="${matchingHerb}"]`);

            // If no direct match, try to find a button with case-insensitive matching
            if (!matchingButton) {
                herbButtons.forEach(button => {
                    const buttonHerb = button.getAttribute('data-herb');
                    if (buttonHerb && buttonHerb.toLowerCase().includes(herbId.toLowerCase())) {
                        matchingHerb = buttonHerb;
                        matchingButton = button;
                    }
                });
            }

            if (matchingButton) {
                // Trigger click on the matching button to keep UI in sync
                matchingButton.click();
            } else {
                // If no matching button, just toggle the selection visually
                console.log(`${teaLangManager.t('errors.noMatchingButton')}: ${herbId}`);

                // Toggle selection in game state
                if (gameState.herbs.includes(herbId)) {
                    // Remove herb
                    const index = gameState.herbs.indexOf(herbId);
                    if (index !== -1) {
                        gameState.herbs.splice(index, 1);
                        console.log(`${teaLangManager.t('removedHerb')}: ${herbId}`);
                    }
                    newItem.classList.remove('jar-selected');
                } else {
                    // Add herb
                    gameState.herbs.push(herbId);
                    console.log(`${teaLangManager.t('addedHerb')}: ${herbId}`);
                    newItem.classList.add('jar-selected');
                }

                // Visualize herbs in cup
                visualizeHerbs();
            }
        });
    });
}

// Set up sweeteners selection
function setupSweetenersSelection() {
    const sweetenerButtons = document.querySelectorAll('.main__right__sweeteners__item');
    if (sweetenerButtons.length === 0) {
        console.error(teaLangManager.t('errors.sweetenerSelectionNotFound'));
        return;
    }

    console.log(teaLangManager.t('sweetenersSelectionSetup'));

    // Create the sweeteners selection UI if it doesn't exist
    createSweetenersSection();

    // Get the actual sweetener options available on the shelf
    const shelfSweeteners = Array.from(sweetenerButtons).map(item => item.id);

    // Setup the UI buttons
    const sweetenerSelectionButtons = document.querySelectorAll('.board__sweeteners__button');
    sweetenerSelectionButtons.forEach(button => {
        // Remove any existing event listeners by cloning
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);

        // Add new event listener
        newBtn.addEventListener('click', () => {
            const sweetener = newBtn.getAttribute('data-sweetener');

            if (sweetener === 'none') {
                // Continue to temperature section when "Continue" is clicked
                showSection('temperature');
            } else {
                // Toggle selected class for visual feedback
                newBtn.classList.toggle('selected');

                // Update the button style to match the selected state
                if (newBtn.classList.contains('selected')) {
                    newBtn.style.background = 'linear-gradient(to bottom, #8d6e63, #6d4c41)';
                    newBtn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    const heading = newBtn.querySelector('h2');
                    if (heading) {
                        heading.style.color = '#f5e9dc';
                        heading.style.textShadow = '0 1px 2px rgba(0, 0, 0, 0.3)';
                    }
                } else {
                    newBtn.style.background = 'linear-gradient(to bottom, rgba(245, 233, 220, 0.9), rgba(233, 219, 205, 0.9))';
                    newBtn.style.border = '1px solid rgba(138, 94, 61, 0.3)';
                    const heading = newBtn.querySelector('h2');
                    if (heading) {
                        heading.style.color = '#3e2723';
                        heading.style.textShadow = '';
                    }
                }

                // Add or remove sweetener from game state
                if (newBtn.classList.contains('selected')) {
                    // Add sweetener if not already in the array
                    if (!gameState.sweeteners.includes(sweetener)) {
                        gameState.sweeteners.push(sweetener);
                        console.log(`${teaLangManager.t('addedSweetener')}: ${sweetener}`);
                    }
                } else {
                    // Remove sweetener if in the array
                    const index = gameState.sweeteners.indexOf(sweetener);
                    if (index !== -1) {
                        gameState.sweeteners.splice(index, 1);
                        console.log(`${teaLangManager.t('removedSweetener')}: ${sweetener}`);
                    }
                }

                // Visualize sweeteners in cup
                visualizeSweeteners();
            }
        });
    });

    // Also allow clicking directly on sweetener items to select them
    // Use event delegation for sweetener items
    const sweetenersContainer = document.querySelector('.main__right__sweeteners');
    if (sweetenersContainer) {
        // Remove existing event listeners by cloning container
        const newContainer = sweetenersContainer.cloneNode(true);
        sweetenersContainer.parentNode.replaceChild(newContainer, sweetenersContainer);

        // Add a single event listener to the container
        newContainer.addEventListener('click', function(e) {
            // Find the closest sweetener item if clicked within the container
            const sweetenerItem = e.target.closest('.main__right__sweeteners__item');
            if (sweetenerItem) {
                e.stopPropagation(); // Prevent event bubbling
                const sweetenerId = sweetenerItem.id;

                // Find the corresponding board button
                const matchingButton = document.querySelector(`.board__sweeteners__button[data-sweetener="${sweetenerId}"]`);

                if (matchingButton) {
                    // Trigger click on the matching button to keep UI in sync
                    matchingButton.click();
                } else {
                    // If no direct match, toggle manually
                    console.log(`${teaLangManager.t('errors.noMatchingButton')}: ${sweetenerId}`);

                    // Toggle selection in game state
                    if (gameState.sweeteners.includes(sweetenerId)) {
                        // Remove sweetener
                        const index = gameState.sweeteners.indexOf(sweetenerId);
                        if (index !== -1) {
                            gameState.sweeteners.splice(index, 1);
                            console.log(`${teaLangManager.t('removedSweetener')}: ${sweetenerId}`);
                        }
                        sweetenerItem.classList.remove('jar-selected');
                    } else {
                        // Add sweetener
                        gameState.sweeteners.push(sweetenerId);
                        console.log(`${teaLangManager.t('addedSweetener')}: ${sweetenerId}`);
                        sweetenerItem.classList.add('jar-selected');
                    }

                    // Visualize sweeteners in cup
                    visualizeSweeteners();
                }
            }
        });

        // Make all sweetener items visibly clickable
        const allSweetenerItems = newContainer.querySelectorAll('.main__right__sweeteners__item');
        allSweetenerItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.style.zIndex = '150';
            item.style.position = 'relative';
            item.style.pointerEvents = 'auto';
        });
    }

    // Ensure the sweeteners board section is properly displayed
    const sweetenersSection = document.querySelector('.board__sweeteners');
    if (sweetenersSection) {
        sweetenersSection.style.display = 'flex';
        sweetenersSection.style.flexWrap = 'wrap';
        sweetenersSection.style.justifyContent = 'center';
        sweetenersSection.style.alignItems = 'center';
        sweetenersSection.style.gap = '18px';
        sweetenersSection.style.width = '100%';
        sweetenersSection.style.pointerEvents = 'auto';
    }
}

// Create sweeteners section if it doesn't exist
function createSweetenersSection() {
    // Check if sweeteners section already exists
    if (document.querySelector('.board__sweeteners')) {
        return;
    }

    // Create the title
    const titleContainer = document.querySelector('.board__title');
    if (titleContainer) {
        const sweetenersTitle = document.createElement('h1');
        sweetenersTitle.className = 'sweeteners hidden';
        sweetenersTitle.textContent = 'Add Sweetness'; // This will be handled by main language manager
        titleContainer.appendChild(sweetenersTitle);
    }

    // Create the content section
    const contentContainer = document.querySelector('.board__content');
    if (contentContainer) {
        const sweetenersSection = document.createElement('div');
        sweetenersSection.className = 'board__sweeteners hidden';
        sweetenersSection.style.display = 'flex';
        sweetenersSection.style.flexWrap = 'wrap';
        sweetenersSection.style.justifyContent = 'center';
        sweetenersSection.style.alignItems = 'center';
        sweetenersSection.style.gap = '18px';
        sweetenersSection.style.width = '100%';

        // Get actual sweeteners from shelf
        const shelfSweetenerItems = document.querySelectorAll('.main__right__sweeteners__item');
        const shelfSweeteners = Array.from(shelfSweetenerItems).map(item => item.id);

        // Use shelf sweeteners for the board buttons
        const sweetenersToShow = [...shelfSweeteners, 'none'];

        // Add sweetener buttons with styling to match the rest of the interface
        sweetenersToShow.forEach(sweetener => {
            const button = document.createElement('div');
            button.className = 'board__sweeteners__button';
            button.setAttribute('data-sweetener', sweetener);

            // Apply styling to match other buttons
            button.style.width = '180px';
            button.style.height = '55px';
            button.style.background = 'linear-gradient(to bottom, rgba(245, 233, 220, 0.9), rgba(233, 219, 205, 0.9))';
            button.style.borderRadius = '10px';
            button.style.display = 'flex';
            button.style.justifyContent = 'center';
            button.style.alignItems = 'center';
            button.style.cursor = 'pointer';
            button.style.transition = 'all 0.3s ease';
            button.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
            button.style.border = '1px solid rgba(138, 94, 61, 0.3)';

            // Add hover effect
            button.addEventListener('mouseover', () => {
                button.style.transform = 'translateY(-4px)';
                button.style.boxShadow = '0 7px 14px rgba(0, 0, 0, 0.25)';
            });

            button.addEventListener('mouseout', () => {
                if (!button.classList.contains('selected')) {
                    button.style.transform = '';
                    button.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.15)';
                }
            });

            const heading = document.createElement('h2');
            heading.textContent = sweetener === 'none' ? 'Continue' :
                (sweetener.charAt(0).toUpperCase() + sweetener.slice(1));
            heading.style.textAlign = 'center';
            heading.style.lineHeight = '1.4';
            heading.style.color = '#3e2723';
            heading.style.letterSpacing = '1px';
            heading.style.textTransform = 'uppercase';
            heading.style.fontFamily = "'Playfair Display', serif";
            heading.style.fontSize = '14px';
            heading.style.margin = '5px 0';

            button.appendChild(heading);
            sweetenersSection.appendChild(button);
        });

        contentContainer.appendChild(sweetenersSection);
    }
}

// Set up temperature controls
function setupTemperatureControls() {
    const tempSlider = document.getElementById('tempSlider');
    const tempValue = document.querySelector('.temperature-value');
    const continueBtn = document.getElementById('temperature-continue');

    if (!tempSlider || !tempValue || !continueBtn) {
        console.error(teaLangManager.t('errors.temperatureControlsNotFound'));
        return;
    }

    console.log(teaLangManager.t('temperatureSetup'));

    // Update temperature value when slider changes
    tempSlider.addEventListener('input', () => {
        const temp = tempSlider.value;
        const tempC = Math.round((temp - 32) * 5 / 9);
        tempValue.textContent = `${temp}${teaLangManager.t('fahrenheit')} (${tempC}${teaLangManager.t('celsius')})`;
        gameState.temperature = parseInt(temp);

        // Visualize temperature effect on kettle
        visualizeTemperature(temp);
    });

    // Continue to time selection
    continueBtn.addEventListener('click', () => {
        showSection('time');
    });
}

// Set up brewing time selection
function setupTimeSelection() {
    const timeButtons = document.querySelectorAll('.board__time__button');
    if (timeButtons.length === 0) {
        console.error(teaLangManager.t('errors.brewingTimeNotFound'));
        return;
    }

    console.log(teaLangManager.t('timeSelectionSetup'));

    timeButtons.forEach(button => {
        // Remove any existing event listeners by cloning
        const newBtn = button.cloneNode(true);
        button.parentNode.replaceChild(newBtn, button);

        // Add new event listener
        newBtn.addEventListener('click', () => {
            const time = parseInt(newBtn.getAttribute('data-time'));
            gameState.brewingTime = time;

            console.log(`${teaLangManager.t('selectedBrewingTime')}: ${time} ${teaLangManager.t('minutes')}`);

            // Simulate brewing
            startBrewing(time);

            // After brewing is done, show assessment
            setTimeout(() => {
                calculateRating();
                showSection('assessment');
                updateAssessmentStars();
            }, time * 1000); // Speed up for demo: 1 second per minute
        });
    });
}

// Setup reset button
function setupResetButton() {
    const resetBtn = document.querySelector('.board__footer__reset');
    if (!resetBtn) {
        console.error(teaLangManager.t('errors.resetButtonNotFound'));
        return;
    }

    console.log(teaLangManager.t('resetButtonSetup'));

    // Remove any existing event listeners by cloning
    const newBtn = resetBtn.cloneNode(true);
    resetBtn.parentNode.replaceChild(newBtn, resetBtn);

    // Add new event listener
    newBtn.addEventListener('click', resetGame);
}

// Show the specified section and hide others
function showSection(sectionName) {
    console.log(`${teaLangManager.t('showingSection')}: ${sectionName}`);

    // Hide all titles and content sections
    document.querySelectorAll('.board__title h1').forEach(title => {
        title.classList.add('hidden');
        title.classList.remove('active');
    });

    document.querySelectorAll('.board__content > div').forEach(section => {
        section.classList.add('hidden');
    });

    // Show the relevant title and content section
    const title = document.querySelector(`.board__title h1.${sectionName}`);
    const content = document.querySelector(`.board__${sectionName}`);

    if (title) {
        title.classList.remove('hidden');
        title.classList.add('active');
    }

    if (content) {
        content.classList.remove('hidden');
    }
}

// Reset the game to initial state
function resetGame() {
    console.log(teaLangManager.t('resettingGame'));

    // Reset game state
    gameState = {
        teaType: null,
        teaColor: null,
        teaLeaves: null,
        herbs: [],
        sweeteners: [],
        temperature: 195,
        brewingTime: null,
        rating: 0
    };

    // Reset UI elements

    // Reset selected herbs
    document.querySelectorAll('.board__herbs__button.selected').forEach(button => {
        button.classList.remove('selected');
    });

    // Reset selected sweeteners
    document.querySelectorAll('.board__sweeteners__button.selected').forEach(button => {
        button.classList.remove('selected');
    });

    // Reset temperature slider
    const tempSlider = document.getElementById('tempSlider');
    if (tempSlider) {
        tempSlider.value = 195;
        const tempValue = document.querySelector('.temperature-value');
        if (tempValue) {
            tempValue.textContent = `195${teaLangManager.t('fahrenheit')} (90${teaLangManager.t('celsius')})`;
        }
    }

    // Reset cup and kettle
    resetVisuals();

    // Return to welcome screen
    showSection('welcome');
}

// Visualize the selected tea in the kettle
function visualizeTeaSelection(teaType, teaColor, teaLeaves) {
    console.log(`${teaLangManager.t('visualizingTea')}: ${teaType}, color: ${teaColor}`);

    // Change kettle liquid color
    const kettleLiquid = document.querySelector('.main__kettle__liquid');
    if (kettleLiquid) {
        kettleLiquid.style.backgroundColor = teaColor;
        kettleLiquid.style.height = '90%';
    }

    // Show the cup
    const cup = document.querySelector('.main__cup');
    if (cup) {
        cup.classList.remove('hidden');
    }

    // Show the spoon
    const spoon = document.querySelector('.main__spoon');
    if (spoon) {
        spoon.classList.remove('hidden');
    }

    // Highlight selected tea jar
    document.querySelectorAll('.main__right__tea_jars__jar').forEach(jar => {
        jar.classList.remove('jar-selected');
    });

    const selectedJar = document.getElementById(`${teaType}-tea`);
    if (selectedJar) {
        selectedJar.classList.add('jar-selected');
    }
}

// Visualize herbs in the cup
function visualizeHerbs() {
    console.log(`${teaLangManager.t('visualizingHerbs')}: ${gameState.herbs.join(', ')}`);

    // Update cup herbs visualization
    const herbsContainer = document.querySelector('.main__cup__herbs');
    if (herbsContainer) {
        // Show herbs container if herbs are selected
        if (gameState.herbs.length > 0) {
            herbsContainer.style.height = '80%';
        } else {
            herbsContainer.style.height = '0';
        }

        // Get all available herbs from the UI
        const allHerbItems = document.querySelectorAll('.main__right__herbs__item');
        const shelfHerbs = Array.from(allHerbItems).map(item => item.id);

        // Also get herbs from the board buttons
        const herbButtons = document.querySelectorAll('.board__herbs__button');
        const boardHerbs = [];
        herbButtons.forEach(button => {
            const herb = button.getAttribute('data-herb');
            if (herb && herb !== 'none') {
                boardHerbs.push(herb.toLowerCase().replace(/\s+/g, ''));
            }
        });

        // Make sure honey doesn't show up in herbs visualization if it's a board button but not a shelf herb
        const isHoneyBoardOption = boardHerbs.includes('honey');
        const isHoneyShelfHerb = shelfHerbs.includes('honey');

        if (isHoneyBoardOption && !isHoneyShelfHerb) {
            // Remove honey from herbs if it's a board option but not a shelf herb
            const honeyIndex = gameState.herbs.indexOf('honey');
            if (honeyIndex !== -1) {
                // Move honey to sweeteners instead
                if (!gameState.sweeteners.includes('honey')) {
                    gameState.sweeteners.push('honey');
                }
                gameState.herbs.splice(honeyIndex, 1);
            }
        }

        // Proper mapping for all herbs
        const herbDisplayMap = {
            'staranise': 'anise',
            'anise': 'anise',
            'cinnamon': 'cinnamon',
            'cardamom': 'cardamom',
            'mint': 'mint',
            'ginger': 'ginger'
        };

        // Display selected herbs in the cup
        Object.keys(herbDisplayMap).forEach(herbKey => {
            const displayName = herbDisplayMap[herbKey];

            // Check if this herb is selected (normalized comparison)
            const isSelected = gameState.herbs.some(selectedHerb => {
                const normalizedSelected = selectedHerb.toLowerCase().replace(/\s+/g, '');
                return normalizedSelected === herbKey || normalizedSelected === displayName;
            });

            // Display the herb in the cup
            const herbElement = document.querySelector(`.herb-${displayName}`);
            if (herbElement) {
                herbElement.style.display = isSelected ? 'block' : 'none';
            }
        });

        // Special handling for mint and ginger
        const mintElement = document.querySelector('.herb-mint');
        if (mintElement && gameState.herbs.some(h => h.toLowerCase().includes('mint'))) {
            mintElement.style.display = 'block';
        }

        const gingerElement = document.querySelector('.herb-ginger');
        if (gingerElement && gameState.herbs.some(h => h.toLowerCase().includes('ginger'))) {
            gingerElement.style.display = 'block';
        }

        // Highlight selected herb items on shelf
        shelfHerbs.forEach(herbId => {
            const herbItem = document.getElementById(herbId);
            if (herbItem) {
                // Check if this herb is selected
                const isSelected = gameState.herbs.some(selectedHerb => {
                    const normalizedSelected = selectedHerb.toLowerCase().replace(/\s+/g, '');
                    const normalizedShelf = herbId.toLowerCase().replace(/\s+/g, '');

                    // Special case for star anise
                    if (normalizedShelf === 'anise' && normalizedSelected === 'staranise') {
                        return true;
                    }

                    return normalizedSelected === normalizedShelf ||
                        normalizedSelected.includes(normalizedShelf) ||
                        normalizedShelf.includes(normalizedSelected);
                });

                if (isSelected) {
                    herbItem.classList.add('jar-selected');
                } else {
                    herbItem.classList.remove('jar-selected');
                }
            }
        });
    }
}

// Visualize sweeteners in the cup
function visualizeSweeteners() {
    console.log(`${teaLangManager.t('visualizingSweeteners')}: ${gameState.sweeteners.join(', ')}`);

    // Update cup sweeteners visualization
    const sweetenersContainer = document.querySelector('.main__cup__sweeteners');
    if (sweetenersContainer) {
        // Show sweeteners container if sweeteners are selected
        if (gameState.sweeteners.length > 0) {
            sweetenersContainer.style.height = '80%';
        } else {
            sweetenersContainer.style.height = '0';
        }

        // Get all available sweeteners from the shelf
        const sweetenerItems = document.querySelectorAll('.main__right__sweeteners__item');
        const shelfSweeteners = Array.from(sweetenerItems).map(item => item.id);

        // Show/hide specific sweeteners
        shelfSweeteners.forEach(sweetener => {
            // Normalize for comparison
            const normalizedSweetener = sweetener.toLowerCase();

            // Check if this sweetener is in the game state
            const isSelected = gameState.sweeteners.some(selected =>
                selected.toLowerCase() === normalizedSweetener);

            const sweetenerElement = document.querySelector(`.sweetener-${sweetener}`);
            if (sweetenerElement) {
                if (isSelected) {
                    sweetenerElement.style.display = 'block';
                } else {
                    sweetenerElement.style.display = 'none';
                }
            }

            // Highlight selected sweetener items on shelf
            const sweetenerItem = document.getElementById(sweetener);
            if (sweetenerItem) {
                if (isSelected) {
                    sweetenerItem.classList.add('jar-selected');
                } else {
                    sweetenerItem.classList.remove('jar-selected');
                }
            }
        });
    }
}

// Visualize temperature effect on kettle
function visualizeTemperature(temp) {
    console.log(`${teaLangManager.t('visualizingTemperature')}: ${temp}${teaLangManager.t('fahrenheit')}`);

    // Show steam if temperature is high enough
    const steam = document.querySelector('.main__kettle__steam');
    if (steam) {
        if (temp > 190) {
            steam.style.opacity = '1';

            // Add boiling animation to kettle liquid
            const kettleLiquid = document.querySelector('.main__kettle__liquid');
            if (kettleLiquid) {
                kettleLiquid.classList.add('kettle-boiling');
            }
        } else {
            steam.style.opacity = '0';

            // Remove boiling animation
            const kettleLiquid = document.querySelector('.main__kettle__liquid');
            if (kettleLiquid) {
                kettleLiquid.classList.remove('kettle-boiling');
            }
        }
    }
}

// Start brewing animation
function startBrewing(time) {
    console.log(`${teaLangManager.t('startingBrewing')} ${time} ${teaLangManager.t('minutes')}`);

    // Show spoon animation
    const spoon = document.querySelector('.main__spoon');
    if (spoon) {
        spoon.classList.add('brewing-animation');

        // Remove animation after it's done
        setTimeout(() => {
            spoon.classList.remove('brewing-animation');
        }, 3000);
    }

    // Pour tea from kettle to cup
    // First, show cup if not already visible
    const cup = document.querySelector('.main__cup');
    if (cup) {
        cup.classList.remove('hidden');
    }

    // Then, fill the cup with tea
    const cupLiquid = document.querySelector('.main__cup__liquid');
    if (cupLiquid) {
        // Set cup liquid color to match tea
        cupLiquid.style.backgroundColor = gameState.teaColor;
        cupLiquid.style.height = '80%';
    }

    // Show tea leaves in the cup
    const teaLeaves = document.querySelector('.main__cup__tea_leaves');
    if (teaLeaves) {
        teaLeaves.style.height = '80%';

        // Make tea leaves visible
        const leaves = teaLeaves.querySelectorAll('span');
        leaves.forEach(leaf => {
            leaf.style.opacity = '1';
            leaf.style.backgroundColor = gameState.teaLeaves || '#7d9c66';
        });
    }

    // Show cup steam
    const cupSteam = document.querySelector('.steam-from-cup');
    if (cupSteam) {
        cupSteam.style.opacity = '1';
    }
}