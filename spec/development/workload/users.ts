/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

import { assert } from "chai";
import "isomorphic-fetch";
import { getClient, randomString } from "../test-helper";
import { User } from '@microsoft/microsoft-graph-types';

const client = getClient();

describe('Users', function () {

	this.timeout(10 * 1000);

	it('Fetch the authenticated user and access entity properties', async () => {
		try {
			let res = await client.api("/me").get();
			const user = res as User;
			assert.isDefined(user.displayName);
			assert.isDefined(user.mail);
			assert.isDefined(user.id);

			assert.isDefined(user.surname);
			assert.isDefined(user.userPrincipalName);

			assert.isArray(user.businessPhones);

			assert.isUndefined(user['invalidPropertyName']);
		} catch (error) {
			throw error;
		}
	});

	it('Fetch the authenticated user and access entity properties', async () => {
		try {
			let res = await client.api("/me").get();
			const user = res as User;
			assert.isDefined(user.displayName);
			assert.isDefined(user.mail);
			assert.isDefined(user.id);

			assert.isDefined(user.surname);
			assert.isDefined(user.userPrincipalName);

			assert.isArray(user.businessPhones);

			assert.isUndefined(user['invalidPropertyName']);
		} catch (error) {
			throw error;
		}
	});


	it('Modify and verify officeLocation property', async () => {
		try {
			const officeLocation = randomString();
			await client.api("/me").patch({ officeLocation });
			let res = await client.api("/me").get();
			const user = res as User;
			assert.equal(user.officeLocation, officeLocation);
		} catch (error) {
			throw error;
		}
	});


	it('Modify and verify givenName property', async () => {
		try {
			const givenName = randomString();
			await client.api("/me").patch({ givenName });
			let res = await client.api("/me").get();
			const user = res as User;
			assert.equal(user.givenName, givenName);
		} catch (error) {
			throw error;
		}
	});

	it('Fetch a list of users and access properties on a collection item', async () => {
		try {
			let collection = await client.api("/users").get();
			const users: User[] = collection.value;
			assert.isDefined(users[0].displayName);
			assert.isDefined(users[0].id);
			assert.isDefined(users[0].mail);
		} catch (error) {
			throw error;
		}
	});


	it('Filters on users list', async () => {
		try {
			await client.api("/users").filter("Department eq 'Finance'").get();
		} catch (error) {
			throw error;
		}
	});
});