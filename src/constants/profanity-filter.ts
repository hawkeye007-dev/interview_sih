export const BANNED_WORDS = [

    'ass', 'fuck', 'shit', 'damn', 'bitch', 'bastard', 'hell',
    'crap', 'piss', 'dick', 'cock', 'pussy', 'boob', 'tit',
    

    'gyat', 'skibidi', 'sigma', 'rizz', 'ohio', 'sussy', 'sus',
    'cap', 'no cap', 'bussin', 'sheesh', 'based', 'cringe',
    'simp', 'chad', 'beta', 'alpha', 'ligma', 'sugma',
    

    'yeet', 'bruh', 'thicc', 'periodt', 'slay', 'queen'
];

export const FUNNY_RESPONSES = [
    "Whoa there! 🙈 You're being a bit too spicy for me. I'm here to help with coding, not comedy roasts!",
    "Hey now! 😤 You're a bad boy/girl, you don't deserve my wisdom! Let's keep it professional, shall we?",
    "Tsk tsk! 🤨 I see what you did there. How about we channel that energy into some algorithm problems instead?",
    "Oh my! 😱 Someone's feeling rebellious today. I'm programmed to be helpful, not to match your sass level!",
    "Nice try! 😏 But I'm too sophisticated for such language. Let's talk about something that'll actually help your career!",
    "Ahem! 🎩 A true professional developer communicates with elegance. Care to rephrase that in a more... refined manner?",
    "Yikes! 🚫 My circuits are designed for technical excellence, not for processing such colorful vocabulary!",
    "Oh dear! 😅 Looks like someone needs a timeout from the internet. How about we discuss clean code principles instead?",
    "Naughty naughty! 🫵 I'm here to elevate your programming skills, not your... creative expression!",
    "Alert! Alert! 🚨 Inappropriate content detected. Redirecting to wholesome coding discussion mode..."
];

export const containsProfanity = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return BANNED_WORDS.some(word => {
        // Check for exact word matches (with word boundaries)
        const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, 'i');
        return regex.test(lowerText);
    });
};

export const getRandomFunnyResponse = (): string => {
    return FUNNY_RESPONSES[Math.floor(Math.random() * FUNNY_RESPONSES.length)];
}; 