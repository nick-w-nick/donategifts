/* eslint-disable import/no-extraneous-dependencies */
const fs = require('node:fs');
const path = require('node:path');
const { randomUUID } = require('node:crypto');

const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

const randomNumber = (min = 0, max = 100) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

(async () => {
	try {
		const prepareAgencies = () => {
			const agencies = require('./seeder-data/agencies.json');
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
			
			fs.writeFileSync(
				path.join(__dirname, './seeder-data/agencies.json'),
				JSON.stringify(agenciesData, null, 4),
				'utf8',
			);
            
            return agenciesData;
		};
		
		const prepareChildren = () => {
			const children = require('./seeder-data/children.json');
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
			
			fs.writeFileSync(
				path.join(__dirname, './seeder-data/children.json'),
				JSON.stringify(childrenData, null, 4),
				'utf8',
			);
            
            return childrenData;
		};
		
		const prepareCommunityPosts = () => {
			const communityPosts = require('./seeder-data/community_posts.json');
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
			
			fs.writeFileSync(
				path.join(__dirname, './seeder-data/community_posts.json'),
				JSON.stringify(communityPostsData, null, 4),
				'utf8',
			);
            
            return communityPostsData;
		};
		
		const prepareUsers = async () => {
            const users = require('./seeder-data/users.json');
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
			
			fs.writeFileSync(
				path.join(__dirname, './seeder-data/users.json'),
				JSON.stringify(usersData, null, 4),
				'utf8',
			);
            
            return usersData;
		};
		
        
		const createFiles = () => {
			const users = prepareUsers();
			const agencies = prepareAgencies();
			const children = prepareChildren();
			const communityPosts = prepareCommunityPosts();
			// prepareContacts();
			// prepareDonations();
			// prepareMessages();
			// prepareWishCards();
            
            return {
                users,
                agencies,
                children,
                communityPosts,
            };
		};
        
        const processAgencies = () => {
            const agencies = require('./seeder-data/agencies.json');
            const users = require('./seeder-data/users.json');
            
            const adminUsers = users.filter((user) => user.role === 'admin');
            
            const agenciesWithAccountManagers = agencies.reduce((acc, agency) => {
                // ignore if agency already has an account manager
                if (agency.account_manager_id) {
                    acc.push(agency);
                    return acc;
                }
                
                const randomAdminUserIndex = randomNumber(0, adminUsers.length - 1);
                const randomAdminUserId = adminUsers[randomAdminUserIndex].id || null;
                
                acc.push({
                    ...agency,
                    account_manager_id: randomAdminUserId,
                });
                
                return acc;
            }, []);
            
            fs.writeFileSync(
                path.join(__dirname, './seeder-data/agencies.json'),
                JSON.stringify(agenciesWithAccountManagers, null, 4),
                'utf8',
            );
        };
        
        const processFiles = () => {
            processAgencies();
        };
        
		const {
            users,
            agencies,
            children,
            communityPosts,
        } = createFiles();
        
        processFiles();
	} catch (error) {
		console.error(error);
	}
})();
