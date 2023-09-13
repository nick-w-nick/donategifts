const {
    importSeederFile,
    saveSeederFile,
    randomNumber,
} = require('../utils');

const processAgencies = async () => {
    const agencies = await importSeederFile('agencies');
    const users = await importSeederFile('users');
    
    const adminUsers = users.filter((user) => user.role === 'admin');
    
    const agenciesWithAccountManagers = agencies.reduce((acc, agency) => {
        const hasValidUser = agency.account_manager_id && users.some((user) => user.id === agency.account_manager_id);
        
        const randomAdminUserIndex = randomNumber(0, adminUsers.length - 1);
        const randomAdminUserId = adminUsers[randomAdminUserIndex].id || null;
        
        acc.push({
            ...agency,
            ...(!hasValidUser && { account_manager_id: randomAdminUserId })
        });
        
        return acc;
    }, []);
    
    await saveSeederFile('agencies', agenciesWithAccountManagers);
};

const processChildren = async () => {
    const children = await importSeederFile('children');
    const agencies = await importSeederFile('agencies');
    
    const childrenWithAgencies = children.reduce((acc, child) => {
        const hasValidAgency = child.agency_id && agencies.some((agency) => agency.id === child.agency_id);
        
        const randomAgencyIndex = randomNumber(0, agencies.length - 1);
        const randomAgencyId = agencies[randomAgencyIndex].id || null;
        
        acc.push({
            ...child,
            ...(!hasValidAgency && { agency_id: randomAgencyId }),
        });
        
        return acc;
    }, []);
    
    await saveSeederFile('children', childrenWithAgencies);
};

const processCommunityPosts = async () => {
    const communityPosts = await importSeederFile('community_posts');
    const agencies = await importSeederFile('agencies');
    
    const communityPostsWithAgencies = communityPosts.reduce((acc, communityPost) => {
        const hasValidAgency = communityPost.agency_id && agencies.some((agency) => agency.id === communityPost.agency_id);
        
        const randomAgencyIndex = randomNumber(0, agencies.length - 1);
        const randomAgencyId = agencies[randomAgencyIndex].id || null;
        
        acc.push({
            ...communityPost,
            ...(!hasValidAgency && { agency_id: randomAgencyId }),
        });
        
        return acc;
    }, []);
    
    await saveSeederFile('community_posts', communityPostsWithAgencies);
};

const processMessages = async () => {
    const messages = await importSeederFile('messages');
    const users = await importSeederFile('users');
    const wishcards = await importSeederFile('wishcards');
    
    const processedMessages = messages.reduce((acc, message) => {
        const hasValidUser = message.sender_id && users.some((user) => user.id === message.sender_id);
        const hasValidWishcard = message.wishcard_id && wishcards.some((wishcard) => wishcard.id === message.wishcard_id);
        
        if (hasValidUser && hasValidWishcard) {
            acc.push(message);
            return acc;
        }
        
        const randomUserIndex = randomNumber(0, users.length - 1);
        const randomUserId = users[randomUserIndex].id || null;
        
        const randomWishcardIndex = randomNumber(0, wishcards.length - 1);
        const randomWishcardId = wishcards[randomWishcardIndex].id || null;
        
        acc.push({
            ...message,
            ...(!hasValidUser && { sender_id: randomUserId }),
            ...(!hasValidWishcard && { wishcard_id: randomWishcardId }),
        });
        
        return acc;
    }, []);
    
    await saveSeederFile('messages', processedMessages);
};

const processOrders = async () => {
    const orders = await importSeederFile('orders');
    const users = await importSeederFile('users');
    const wishcards = await importSeederFile('wishcards');
    
    const processedOrders = orders.reduce((acc, order) => {
        const hasValidUser = order.donor_id && users.some((user) => user.id === order.donor_id);
        const hasValidWishcard = order.wishcard_id && wishcards.some((wishcard) => wishcard.id === order.wishcard_id);
        
        const randomUserIndex = randomNumber(0, users.length - 1);
        const randomUserId = users[randomUserIndex].id || null;
        
        const randomWishcardIndex = randomNumber(0, wishcards.length - 1);
        const randomWishcardId = wishcards[randomWishcardIndex].id || null;
        
        acc.push({
            ...order,
            ...(!hasValidUser && { donor_id: randomUserId }),
            ...(!hasValidWishcard && { wishcard_id: randomWishcardId }),
        });
        
        return acc;
    }, []);
    
    await saveSeederFile('orders', processedOrders);
};

const processVerificationTokens = async () => {
    const verificationTokens = await importSeederFile('verification_tokens');
    const users = await importSeederFile('users');
    
    const processedVerificationTokens = verificationTokens.reduce((acc, verificationToken, index) => {
        const hasValidUser = verificationToken.user_id && users.some((user) => user.id === verificationToken.user_id);
        
        const userId = users[index].id || null;
        
        acc.push({
            ...verificationToken,
            ...(!hasValidUser && { user_id: userId }),
        });
        
        return acc;
    }, []);
    
    await saveSeederFile('verification_tokens', processedVerificationTokens);
};

const processWishcards = async () => {
    const wishcards = await importSeederFile('wishcards');
    const children = await importSeederFile('children');
    const items = await importSeederFile('items');
    const users = await importSeederFile('users');
    
    const agencyUsers = users.filter((user) => user.role === 'partner');
    
    const processedWishcards = wishcards.reduce((acc, wishcard) => {
        const hasValidChild = wishcard.child_id && children.some((child) => child.id === wishcard.child_id);
        const hasValidItem = wishcard.item_id && items.some((item) => item.id === wishcard.item_id);
        const hasValidUser = wishcard.created_by && agencyUsers.some((user) => user.id === wishcard.created_by);
        
        const randomChildIndex = randomNumber(0, children.length - 1);
        const randomChildId = children[randomChildIndex].id || null;
        
        const randomItemIndex = randomNumber(0, items.length - 1);
        const randomItemId = items[randomItemIndex].id || null;
        
        const randomUserIndex = randomNumber(0, agencyUsers.length - 1);
        const randomUserId = agencyUsers[randomUserIndex].id || null;
        
        acc.push({
            ...wishcard,
            ...(!hasValidChild && { child_id: randomChildId }),
            ...(!hasValidItem && { item_id: randomItemId }),
            ...(!hasValidUser && { created_by: randomUserId }),
        });
        
        return acc;
    }, []);
    
    await saveSeederFile('wishcards', processedWishcards);
};

module.exports = {
    processAgencies,
    processChildren,
    processCommunityPosts,
    processMessages,
    processOrders,
    processVerificationTokens,
    processWishcards,
};