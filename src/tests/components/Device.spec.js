/*
 * @copyright 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @author 2018 Christoph Wurst <christoph@winzerhof-wurst.at>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {shallowMount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'

import Nextcloud from '../../mixins/Nextcloud'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.mixin(Nextcloud)

import Device from '../../components/Device'

describe('Device component', () => {
	var actions
	var store

	beforeEach(() => {
		actions = {}
		store = new Vuex.Store({
			state: {
				devices: []
			},
			actions
		})
	})

	it('renders devices without a name', () => {
		store.state.devices.push({
			id: 1,
			name: undefined
		})
		const device = shallowMount(Device, {
			store,
			localVue
		})

		expect(device.text()).to.have.string('Unnamed device')
	})

	it('has a closed popover menu by default', () => {
		const device = shallowMount(Device, {
			store,
			localVue
		})

		expect(device.contains('.popovermenu.open')).to.be.false
	})

	it('opens popover menu on click', done => {
		const device = shallowMount(Device, {
			store,
			localVue
		})

		device.find('.icon-more').trigger('click')

		localVue.nextTick(() => {
			expect(device.vm.showPopover).to.be.true
			done()
		})
	})

	it('closed popover menu on second click', done => {
		const device = shallowMount(Device, {
			store,
			localVue
		})
		device.vm.showPopover = true

		device.find('.icon-more').trigger('click')

		localVue.nextTick(() => {
			expect(device.vm.showPopover).to.be.false
			done()
		})
	})
})