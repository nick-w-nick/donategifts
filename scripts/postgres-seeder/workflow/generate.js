const { randomUUID } = require('node:crypto');

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const { importSeederFile, saveSeederFile } = require('../utils');

const generateAgencies = async () => {
    const agencies = await importSeederFile('agencies');
    const agenciesData = agencies.map((agency) => {
        const {
            id = randomUUID(),
            name = faker.company.name(),
            address_line_1 = faker.location.streetAddress(),
            address_line_2 = faker.location.secondaryAddress(),
            city = faker.location.city(),
            state = faker.location.state(),
            country_code = 'US',
            zip_code = faker.location.zipCode(),
            phone = faker.phone.number(),
            email = faker.internet.email(),
            bio = faker.lorem.paragraph(),
            is_verified = true,
            employer_identification_number = faker.number.int(),
            website = faker.internet.url(),
            account_manager_id = null,
            image_id = null,
        } = agency;
        
        return {
            id,
            name,
            address_line_1,
            address_line_2,
            city,
            state,
            country_code,
            zip_code,
            phone,
            email,
            bio,
            is_verified,
            employer_identification_number,
            website,
            account_manager_id,
            image_id,
        };
    });
    
    await saveSeederFile('agencies', agenciesData);
    return agenciesData;
};

const generateChildren = async () => {
    const children = await importSeederFile('children');
    const childrenData = children.map((child) => {
        const {
            id = randomUUID(),
            first_name = faker.person.firstName(),
            last_name = faker.person.lastName(),
            birth_year = faker.date.past({ years: 15 }).getFullYear(),
            interest = faker.lorem.sentence(),
            story = faker.lorem.paragraph(),
            image_id = null,
            agency_id = null,
        } = child;
        
        return {
            id,
            first_name,
            last_name,
            birth_year,
            interest,
            story,
            image_id,
            agency_id,
        };
    });
    
    await saveSeederFile('children', childrenData);
    return childrenData;
};

const generateCommunityPosts = async () => {
    const communityPosts = await importSeederFile('community_posts');
    const communityPostsData = communityPosts.map((communityPost) => {
        const {
            id = randomUUID(),
            message = faker.lorem.sentence(),
            agency_id = null,
            image_id = null,
        } = communityPost;
        
        return {
            id,
            message,
            agency_id,
            image_id,
        };
    });
    
    await saveSeederFile('community_posts', communityPostsData);
    return communityPostsData;
};

const generateUsers = async () => {
    const users = await importSeederFile('users');
    const salt = await bcrypt.genSalt(10);
    const saltedPassword = await bcrypt.hash('Hello1234!', salt);
    
    const loginModeEnum = {
        Email: 'email',
        Google: 'google',
        Facebook: 'facebook',
    };
    
    const userRoleEnum = {
        Admin: 'admin',
        Donor: 'donor',
        Partner: 'partner',
    };
    
    const staticUsers = [
        {
            first_name: 'Admin',
            last_name: 'User',
            email: 'admin@donate-gifts.com',
            password: saltedPassword,
            role: userRoleEnum.Admin,
            login_mode: loginModeEnum.Email,
        },
        {
            first_name: 'Donor',
            last_name: 'User',
            email: 'donor@donate-gifts.com',
            password: saltedPassword,
            role: userRoleEnum.Donor,
            login_mode: loginModeEnum.Email,
        },
        {
            first_name: 'Partner',
            last_name: 'User',
            email: 'partner@donate-gifts.com',
            password: saltedPassword,
            role: userRoleEnum.Partner,
            login_mode: loginModeEnum.Email,
        }
    ];
    
    const userExists = (email) => {
        return users.some((user) => user.email === email);
    };
    
    // only add static users if they don't already exist
    const newStaticUsers = staticUsers.filter((staticUser) => !userExists(staticUser.email));
    users.push(...newStaticUsers);
    
    const usersData = users.map((user) => {
        const {
            id = randomUUID(),
            first_name = faker.person.firstName(),
            last_name = faker.person.lastName(),
            email = faker.internet.email(),
            password = saltedPassword,
            role = userRoleEnum.Donor,
            login_mode = loginModeEnum.Email,
            bio = faker.lorem.paragraph(),
            is_verified = true,
            image_id = null,
        } = user;
        
        return {
            id,
            first_name,
            last_name,
            email,
            bio,
            login_mode,
            is_verified,
            role,
            password,
            image_id,
        };
    });
    
    await saveSeederFile('users', usersData);
    return usersData;
};

module.exports = {
    generateAgencies,
    generateChildren,
    generateCommunityPosts,
    generateUsers,
};