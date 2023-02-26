

<template>
  <PageWrapper>
  <!-- <PageSection class="mb-0">
      <Alert type="success" title="This is a page for testing purposes"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                            class="mb-6" />
                                        </PageSection> -->
    <MobileTopFixAd class="flex items-center justify-center mt-4 text-center md:hidden md:space-x-4" />
    <PageTopAd class="items-center justify-center hidden mt-4 text-center md:flex md:space-x-4" />
    <PageHeader>
      <PageTitle :text="$t('pages.electricity-bill-calculator.title')" class="capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <TabGroup as="div" class="flex flex-col md:flex-row md:space-x-4" :vertical="screen.higherThan(Size.MEDIUM)">
          <TabList class="flex w-full mb-2 rounded-lg md:w-1/6 md:flex-col">
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded py-2.5 text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.electricity-bill-calculator.tabs.domestic') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded py-2.5 text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                Industrial
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded py-2.5 text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                General Purpose
              </button>
            </HeadlessUiTab>
          </TabList>
          <TabPanels class="flex-1">
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle class="capitalize" :text="$t('pages.setting.sections.validate_username.title')" />
                  <p class="mb-2">
                    {{
                      $t('pages.setting.sections.validate_username.description')
                    }}
                  </p>
                  <div class="flex flex-col md:flex-row">

                    <div class="relative flex w-full mb-2 md:mb-0">
                      <FormTextInput v-model="units" class="w-full">
                        <template #prefix-disabled>
                          <span class="flex-1 px-4 py-2">Units</span>
                        </template>
                      </FormTextInput>
                    </div>

                    <div class="relative flex w-full mb-2 md:mb-0">
                      <div
                        class="flex text-gray-500 border border-gray-900/10 rounded-l-sm dark:border-gray-50/[0.2] dark:bg-slate-800">
                        <span class="flex-1 px-4 py-2">Period</span>
                      </div>
                      <vue-tailwind-datepicker :formatter="formatter" separator=" to "
                        class="z-50 w-full rounded-none rounded-r-md dark:bg-transparent" v-model="dateValue" />
                    </div>

                    <Button type="opposite" @click="calculateElecBill" placeholder="Enter number of Units"
                      class="flex mb-2 space-x-1 border-none md:mb-0">
                      <icon-ic:baseline-calculate />
                      <span>{{ $t('others.calculate') }}</span>
                    </Button>
                  </div>
                  <div class="flex flex-col mt-2 h-4/6">
                    <!-- Table -->
                    <div
                      class="w-full  bg-white dark:bg-slate-800 border-t border-gray-900/10 dark:border-gray-50/[0.2] border border-gray-200 rounded-sm">
                      <div class="p-3 overflow-x-auto border-b-2 border-gray-100">
                        <table class="w-full table-auto">
                          <thead class="text-xs font-semibold text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">
                            <tr>
                              <th class="p-2">
                                <div class="font-semibold text-left">Charge</div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-left">Fixed Charge</div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-left">Energy Charge</div>
                              </th>
                              <th class="p-2">
                                <div class="font-semibold text-left">Total</div>
                              </th>
                            </tr>
                          </thead>

                          <tbody class="text-sm text-gray-800 divide-y divide-gray-100 dark:text-gray-100">
                            <!-- Previous -->
                            <tr>
                              <td class="w-3/12 p-2">
                                <div class="font-medium">
                                  Previous Tariff: Before 2022 Aug
                                </div>
                              </td>

                              <td class="w-3/12 p-2">
                                <div class="text-base font-medium text-left md:text-lg">Rs. {{
                                  applicableFixedCharge.previous.toFixed(2)
                                }}
                                </div>
                              </td>

                              <td class="w-3/12 p-2">
                                <div class="text-base font-medium text-left md:text-lg">
                                  Rs. {{ (totals.previous - applicableFixedCharge.previous).toFixed(2) }}
                                </div>
                              </td>


                              <td class="w-3/12 p-2">
                                <div class="text-base font-medium text-left md:text-lg">
                                  Rs. {{ totals.previous.toFixed(2) }}
                                </div>
                              </td>
                            </tr>
                            <!-- Current Bill -->
                            <tr>

                              <td class="w-2/12 p-2">
                                <div class="font-medium text-blue-400">
                                  Current Tariff: 2022 Aug - 2023 Feb
                                </div>
                              </td>

                              <td class="w-2/12 p-2">
                                <div class="text-base font-medium text-left text-blue-400 md:text-lg">Rs. {{
                                  applicableFixedCharge.current.toFixed(2)
                                }}
                                </div>
                              </td>

                              <td class="w-2/12 p-2">
                                <div class="text-base font-medium text-left text-blue-400 md:text-lg">
                                  Rs. {{ (totals.current - applicableFixedCharge.current).toFixed(2) }}
                                </div>
                              </td>


                              <td class="w-6/12 p-2">
                                <div class="text-base font-medium text-left text-blue-400 md:text-lg">
                                  Rs. {{ (totals.current + totals.current * 2.5 / 97.5).toFixed(2) }}
                                </div>
                                <p class="text-xs font-medium text-gray-400">*2.5% SSCL included</p>
                              </td>
                            </tr>

                            <tr>

                              <td class="w-2/12 p-2">
                                <div class="font-medium">
                                  Proposed Tariff: from 2023 Feb
                                </div>
                              </td>

                              <td class="w-2/12 p-2">
                                <div class="text-base font-medium text-left md:text-lg">Rs. {{
                                  applicableFixedCharge.new.toFixed(2)
                                }}
                                </div>
                              </td>

                              <td class="w-2/12 p-2">
                                <div class="text-base font-medium text-left md:text-lg">
                                  Rs. {{ (totals.new - applicableFixedCharge.new).toFixed(2) }}
                                </div>
                              </td>


                              <td class="w-6/12 p-2">
                                <div class="text-base font-medium text-left md:text-lg">
                                  Rs. {{ (totals.new + totals.new * 2.5 / 97.5).toFixed(2) }}
                                </div>
                                <p class="text-xs font-medium text-gray-400">*2.5% SSCL included</p>
                              </td>
                            </tr>
                            <!-- record 3 -->

                          </tbody>
                        </table>
                      </div>

                      <!-- total amount -->
                      <div class="float-right">
                        <div class="flex flex-row w-full px-4 pt-1 text-sm font-bold">
                          <div class="mr-2 text-base text-red-400">New Total Bill</div>
                        </div>

                        <div class="flex flex-row w-full px-4 pt-1 pb-4 space-x-2 text-sm font-bold">

                          <div class="w-9/12 xs:w-auto">
                            <div class="flex flex-col pr-2 border-gray-100">
                              <div class="text-2xl text-left text-red-600 md:text-3xl"> Rs. {{ new
                                Intl.NumberFormat('en-US', {
                                  maximumFractionDigits: 2,
                                  currency: "LKR"
                                }).format((totals.new + totals.new * 2.5 / 97.5)) }}</div>
                              <p class="text-xs font-medium text-gray-400">*2.5% SSCL included</p>
                            </div>
                          </div>

                          <div>
                            <div class="flex flex-col text-base md:text-xl">
                              <div class="px-2">
                                <div class="mr-2 font-bold text-red-500">
                                  <span class="inline-flex align-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                      stroke-width="1.5" stroke="currentColor" class="w-6 h-6 align-middle fill-red-400">
                                      <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                    </svg></span>
                                  <span class="inline-flex font-bold align-top">
                                    ({{
                                      presentageInc.previous
                                    }}%)
                                  </span>
                                  <span
                                    class="inline-flex px-1 mt-0 text-xs text-gray-400 align-text-top xs:align-baseline">
                                    Since 2023 Feb
                                  </span>
                                </div>
                              </div>
                              <div class="px-2">
                                <div class="mr-2 text-red-500">
                                  <span class="inline-flex align-middle">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                      stroke-width="1.5" stroke="currentColor"
                                      class="w-6 h-6 font-bold align-middle fill-red-500">
                                      <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                    </svg></span>
                                  <span class="inline-flex font-bold align-top">
                                    ({{
                                      presentageInc.now
                                    }}%)
                                  </span>
                                  <span
                                    class="inline-flex px-1 mt-0 text-xs text-gray-400 align-text-top xs:align-baseline">
                                    Since 2022 Aug
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              </CardContent>
              <!-- <CardFooter class="flex flex-col items-center space-y-2 md:space-y md:flex-row md:justify-between">
                                                                                                            <p>
                                                                                                              {{ $t('pages.setting.sections.validate_username.footer') }}
                                                                                                              <Anchor class="font-bold underline capitalize" :text="
                                                                                                                $t(
                                                                                                                  'pages.setting.sections.validate_username.footer_link'
                                                                                                                )
                                                                                                              " href="https://docs.github.com/en/rest/users/users#get-a-user" />
                                                                                                                                                              </p>
                                                                                                                                                            </CardFooter> -->
              </Card>
            </TabPanel>
            <TabPanel>
              <Card :class="{
                'mb-4': true,
                'border-red-500 dark:border-red-500': !enableSpamProtection,
              }">
                <CardContent>
                  <CardTitle class="capitalize" :text="$t('pages.setting.sections.protection_spam.title')" />
                  <p class="mb-2">
                    {{
                      $t('pages.setting.sections.protection_spam.description')
                    }}
                  </p>
                  <div class="flex">
                    <FormSwitch v-model="enableSpamProtection">
                      <span class="capitalize">{{
                        enableSpamProtection
                        ? $t('others.enabled')
                        : $t('others.disabled')
                      }}</span>
                    </FormSwitch>
                  </div>
                </CardContent>
                <CardFooter class="justify-between">
                  <p>
                    {{ $t('pages.setting.sections.protection_spam.footer') }}
                  </p>
                </CardFooter>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle class="capitalize" :text="
                    $t(
                      'pages.setting.sections.advanced_enable_advanced.title'
                    )
                  " />
                  <p class="mb-2">
                    {{
                      $t(
                        'pages.setting.sections.advanced_enable_advanced.description'
                      )
                    }}
                  </p>
                  <div class="flex">
                    <FormSwitch v-model="enableAdvancedSetting">
                      <span class="capitalize">{{
                        enableAdvancedSetting
                        ? $t('others.enabled')
                        : $t('others.disabled')
                      }}</span>
                    </FormSwitch>
                  </div>
                </CardContent>
              </Card>
              <Card class="mb-4" :disabled="!enableAdvancedSetting">
                <CardContent>
                  <CardTitle class="capitalize" :text="
                    $t('pages.setting.sections.advanced_dir_listing.title')
                  " />
                  <p class="mb-2">
                    {{
                      $t(
                        'pages.setting.sections.advanced_dir_listing.description'
                      )
                    }}
                  </p>
                  <div class="flex">
                    <FormSwitch v-model="enableDirList" on>
                      <span class="capitalize">{{
                        enableDirList
                        ? $t('others.enabled')
                        : $t('others.disabled')
                      }}</span>
                    </FormSwitch>
                  </div>
                </CardContent>
              </Card>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </PageSection>
    </PageBody>
  </PageWrapper>
</template>
<script lang="ts" setup>
import {
  TabGroup,
  TabList,
  Tab as HeadlessUiTab,
  TabPanels,
  TabPanel,
} from '@headlessui/vue'
import { capitalize } from '~/utils/str'
import { Size } from '~/composables/useScreen'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { reactive, ref } from 'vue';
import { Switch } from '@headlessui/vue'


import TallAd from "~/components/TallAd.vue"
import MobileTopFixAd from "~/components/MobileTopFixAd.vue"
import PageTopAd from "~/components/PageTopAd.vue"

import ByLine from '~/components/ByLine.vue';
import StatCard from '~/components/StatCard.vue';

import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
// import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'


// composable
const { t } = useLang()
const screen = useScreen()

// compiler macro
definePageMeta({
  layout: 'page',
})
useHead(() => ({
  title: capitalize(t('pages.electricity-bill-calculator.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.electricity-bill-calculator.description'),
    },
  ],
}))

// funcs
const randomToken = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 255; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

// state
const id = ref(randomToken())
const enableSpamProtection = ref(false)
const enableDirList = ref(false)
const enableAdvancedSetting = ref(false)

// methods


// app.component('ByLine', ByLine)

const dateValue = ref([])
const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM',
  options: {
    shortcuts: {
      currentMonth: 'Bulan ini',
      pastMonth: 'Bulan lalu'
    },
  }
})

// const options = ref({
//   shortcuts: {
//     past: (period: any) => period + 'Past',
//     currentMonth: 'Current Month',
//     pastMonth: 'Past Month'
//   },
//   footer: {
//     apply: 'Apply',
//     cancel: 'Cancel'
//   }
// })
// { id: 2, name: 'Previous Month Bill (Rs.)' },

const totals = reactive(
  {
    previous: 0,
    current: 0,
    new: 0
  }
)

const presentageInc = reactive(
  {
    previous: "",
    now: ""
  }
)


const applicableFixedCharge = reactive(
  {
    previous: 0,
    current: 0,
    new: 0
  }
)


const fixedCharge = reactive(
  {
    previous: {
      units_0_30: 30,
      units_31_60: 60,
      units_0_60: 0,
      units_61_90: 90,
      units_91_120: 480,
      units_121_180: 480,
      units_181: 540
    },
    current: {
      units_0_30: 120,
      units_31_60: 240,
      units_0_60: 0,
      units_61_90: 360,
      units_91_120: 960,
      units_121_180: 960,
      units_181: 1500

    },
    new: {
      units_0_30: 400,
      units_31_60: 550,
      units_0_60: 0,
      units_61_90: 650,
      units_91_120: 1500,
      units_121_180: 1500,
      units_181: 2000
    }
  }
)

const energyCharge = reactive(
  {
    previous: {
      units_0_30: 2.5,
      units_31_60: 4.85,
      units_0_60: 7.85,
      units_61_90: 10.00,
      units_91_120: 27.75,
      units_121_180: 32.00,
      units_181: 45.00
    },
    current: {
      units_0_30: 8,
      units_31_60: 10,
      units_0_60: 16,
      units_61_90: 16,
      units_91_120: 50,
      units_121_180: 50,
      units_181: 75

    },
    new: {
      units_0_30: 30,
      units_31_60: 37,
      units_0_60: 42,
      units_61_90: 42,
      units_91_120: 50,
      units_121_180: 50,
      units_181: 75
    }
  }
)

const units = ref(0)
const enabled = ref(false)
const units2 = ref(0)

// let i = 0;
// let array = [];

// for (i = 0; i < 301; i++) {
//   array[i] = calcElec(i).new
// }

// console.log(array)

function calculateElecBill() {

  const numberOfUnits = units.value;
  units2.value = numberOfUnits;

  if (numberOfUnits < 31) {
    totals.previous = fixedCharge.previous.units_0_30 + numberOfUnits * energyCharge.previous.units_0_30;
    applicableFixedCharge.previous = fixedCharge.previous.units_0_30;
    applicableFixedCharge.current = fixedCharge.current.units_0_30;
    applicableFixedCharge.new = fixedCharge.new.units_0_30;

  } else if (numberOfUnits < 61) {
    totals.previous = fixedCharge.previous.units_31_60 + 30 * energyCharge.previous.units_0_30 + (numberOfUnits - 30) * energyCharge.previous.units_31_60;
    applicableFixedCharge.previous = fixedCharge.previous.units_31_60;
    applicableFixedCharge.current = fixedCharge.current.units_31_60;
    applicableFixedCharge.new = fixedCharge.new.units_31_60;
  } else if (numberOfUnits < 91) {
    totals.previous = fixedCharge.previous.units_61_90 + 60 * energyCharge.previous.units_0_60 + (numberOfUnits - 60) * energyCharge.previous.units_61_90;
    applicableFixedCharge.previous = fixedCharge.previous.units_61_90;
    applicableFixedCharge.current = fixedCharge.current.units_61_90;
    applicableFixedCharge.new = fixedCharge.new.units_61_90;
  } else if (numberOfUnits < 121) {
    totals.previous = fixedCharge.previous.units_91_120 + 60 * energyCharge.previous.units_0_60 + 30 * energyCharge.previous.units_61_90 + (numberOfUnits - 90) * energyCharge.previous.units_91_120;
    applicableFixedCharge.previous = fixedCharge.previous.units_91_120;
    applicableFixedCharge.current = fixedCharge.current.units_91_120;
    applicableFixedCharge.new = fixedCharge.new.units_91_120;
  } else if (numberOfUnits < 181) {
    totals.previous = fixedCharge.previous.units_121_180 + 60 * energyCharge.previous.units_0_60 + 30 * energyCharge.previous.units_61_90 + 30 * energyCharge.previous.units_91_120 + (numberOfUnits - 120) * energyCharge.previous.units_121_180;
    applicableFixedCharge.previous = fixedCharge.previous.units_121_180;
    applicableFixedCharge.current = fixedCharge.current.units_121_180;
    applicableFixedCharge.new = fixedCharge.new.units_121_180;
  } else {
    totals.previous = fixedCharge.previous.units_181 + 60 * energyCharge.previous.units_0_60 + 30 * energyCharge.previous.units_61_90 + 30 * energyCharge.previous.units_91_120 + 60 * energyCharge.previous.units_121_180 + (numberOfUnits - 180) * energyCharge.previous.units_181;
    applicableFixedCharge.previous = fixedCharge.previous.units_181;
    applicableFixedCharge.current = fixedCharge.current.units_181;
    applicableFixedCharge.new = fixedCharge.new.units_181;
  }

  if (numberOfUnits < 31) {
    totals.current = fixedCharge.current.units_0_30 + numberOfUnits * energyCharge.current.units_0_30;
  } else if (numberOfUnits < 61) {
    totals.current = fixedCharge.current.units_31_60 + 30 * energyCharge.current.units_0_30 + (numberOfUnits - 30) * energyCharge.current.units_31_60;
  } else if (numberOfUnits < 91) {
    totals.current = fixedCharge.current.units_61_90 + 60 * energyCharge.current.units_0_60 + (numberOfUnits - 60) * energyCharge.current.units_61_90;
  } else if (numberOfUnits < 121) {
    totals.current = fixedCharge.current.units_91_120 + 60 * energyCharge.current.units_0_60 + 30 * energyCharge.current.units_61_90 + (numberOfUnits - 90) * energyCharge.current.units_91_120;
  } else if (numberOfUnits < 181) {
    totals.current = fixedCharge.current.units_121_180 + 60 * energyCharge.current.units_0_60 + 30 * energyCharge.current.units_61_90 + 30 * energyCharge.current.units_91_120 + (numberOfUnits - 120) * energyCharge.current.units_121_180;
  } else {
    totals.current = fixedCharge.current.units_181 + 60 * energyCharge.current.units_0_60 + 30 * energyCharge.current.units_61_90 + 30 * energyCharge.current.units_91_120 + 60 * energyCharge.current.units_121_180 + (numberOfUnits - 180) * energyCharge.current.units_181;
  }

  if (numberOfUnits < 31) {
    totals.new = fixedCharge.new.units_0_30 + numberOfUnits * energyCharge.new.units_0_30;
  } else if (numberOfUnits < 61) {
    totals.new = fixedCharge.new.units_31_60 + 30 * energyCharge.new.units_0_30 + (numberOfUnits - 30) * energyCharge.new.units_31_60;
  } else if (numberOfUnits < 91) {
    totals.new = fixedCharge.new.units_61_90 + 60 * energyCharge.new.units_0_60 + (numberOfUnits - 60) * energyCharge.new.units_61_90;
  } else if (numberOfUnits < 121) {
    totals.new = fixedCharge.new.units_91_120 + 60 * energyCharge.new.units_0_60 + 30 * energyCharge.new.units_61_90 + (numberOfUnits - 90) * energyCharge.new.units_91_120;
  } else if (numberOfUnits < 181) {
    totals.new = fixedCharge.new.units_121_180 + 60 * energyCharge.new.units_0_60 + 30 * energyCharge.new.units_61_90 + 30 * energyCharge.new.units_91_120 + (numberOfUnits - 120) * energyCharge.new.units_121_180;
  } else {
    totals.new = fixedCharge.new.units_181 + 60 * energyCharge.new.units_0_60 + 30 * energyCharge.new.units_61_90 + 30 * energyCharge.new.units_91_120 + 60 * energyCharge.new.units_121_180 + (numberOfUnits - 180) * energyCharge.new.units_181;
  }

  totals.previous = totals.previous
  totals.current = totals.current
  totals.new = totals.new

  presentageInc.previous = (((totals.new + totals.new * 2.5 / 97.5) - (totals.current + totals.current * 2.5 / 97.5)) * 100 / (totals.current + totals.current * 2.5 / 97.5)).toFixed(0);
  presentageInc.now = (((totals.new + totals.new * 2.5 / 97.5) - totals.previous) * 100 / totals.previous).toFixed(0);

  console.log(dateValue.value)
}



function calcElec(no: number) {

  const numberOfUnits = no;

  let totalss = {
    previous: 0,
    current: 0,
    new: 0
  }

  if (numberOfUnits < 31) {
    totalss.previous = fixedCharge.previous.units_0_30 + numberOfUnits * energyCharge.previous.units_0_30;
    applicableFixedCharge.previous = fixedCharge.previous.units_0_30;
    applicableFixedCharge.current = fixedCharge.current.units_0_30;
    applicableFixedCharge.new = fixedCharge.new.units_0_30;

  } else if (numberOfUnits < 61) {
    totalss.previous = fixedCharge.previous.units_31_60 + 30 * energyCharge.previous.units_0_30 + (numberOfUnits - 30) * energyCharge.previous.units_31_60;
    applicableFixedCharge.previous = fixedCharge.previous.units_31_60;
    applicableFixedCharge.current = fixedCharge.current.units_31_60;
    applicableFixedCharge.new = fixedCharge.new.units_31_60;
  } else if (numberOfUnits < 91) {
    totalss.previous = fixedCharge.previous.units_61_90 + 60 * energyCharge.previous.units_0_60 + (numberOfUnits - 60) * energyCharge.previous.units_61_90;
    applicableFixedCharge.previous = fixedCharge.previous.units_61_90;
    applicableFixedCharge.current = fixedCharge.current.units_61_90;
    applicableFixedCharge.new = fixedCharge.new.units_61_90;
  } else if (numberOfUnits < 121) {
    totalss.previous = fixedCharge.previous.units_91_120 + 60 * energyCharge.previous.units_0_60 + 30 * energyCharge.previous.units_61_90 + (numberOfUnits - 90) * energyCharge.previous.units_91_120;
    applicableFixedCharge.previous = fixedCharge.previous.units_91_120;
    applicableFixedCharge.current = fixedCharge.current.units_91_120;
    applicableFixedCharge.new = fixedCharge.new.units_91_120;
  } else if (numberOfUnits < 181) {
    totalss.previous = fixedCharge.previous.units_121_180 + 60 * energyCharge.previous.units_0_60 + 30 * energyCharge.previous.units_61_90 + 30 * energyCharge.previous.units_91_120 + (numberOfUnits - 120) * energyCharge.previous.units_121_180;
    applicableFixedCharge.previous = fixedCharge.previous.units_121_180;
    applicableFixedCharge.current = fixedCharge.current.units_121_180;
    applicableFixedCharge.new = fixedCharge.new.units_121_180;
  } else {
    totalss.previous = fixedCharge.previous.units_181 + 60 * energyCharge.previous.units_0_60 + 30 * energyCharge.previous.units_61_90 + 30 * energyCharge.previous.units_91_120 + 60 * energyCharge.previous.units_121_180 + (numberOfUnits - 180) * energyCharge.previous.units_181;
    applicableFixedCharge.previous = fixedCharge.previous.units_181;
    applicableFixedCharge.current = fixedCharge.current.units_181;
    applicableFixedCharge.new = fixedCharge.new.units_181;
  }

  if (numberOfUnits < 31) {
    totalss.current = fixedCharge.current.units_0_30 + numberOfUnits * energyCharge.current.units_0_30;
  } else if (numberOfUnits < 61) {
    totalss.current = fixedCharge.current.units_31_60 + 30 * energyCharge.current.units_0_30 + (numberOfUnits - 30) * energyCharge.current.units_31_60;
  } else if (numberOfUnits < 91) {
    totalss.current = fixedCharge.current.units_61_90 + 60 * energyCharge.current.units_0_60 + (numberOfUnits - 60) * energyCharge.current.units_61_90;
  } else if (numberOfUnits < 121) {
    totalss.current = fixedCharge.current.units_91_120 + 60 * energyCharge.current.units_0_60 + 30 * energyCharge.current.units_61_90 + (numberOfUnits - 90) * energyCharge.current.units_91_120;
  } else if (numberOfUnits < 181) {
    totalss.current = fixedCharge.current.units_121_180 + 60 * energyCharge.current.units_0_60 + 30 * energyCharge.current.units_61_90 + 30 * energyCharge.current.units_91_120 + (numberOfUnits - 120) * energyCharge.current.units_121_180;
  } else {
    totalss.current = fixedCharge.current.units_181 + 60 * energyCharge.current.units_0_60 + 30 * energyCharge.current.units_61_90 + 30 * energyCharge.current.units_91_120 + 60 * energyCharge.current.units_121_180 + (numberOfUnits - 180) * energyCharge.current.units_181;
  }

  if (numberOfUnits < 31) {
    totalss.new = fixedCharge.new.units_0_30 + numberOfUnits * energyCharge.new.units_0_30;
  } else if (numberOfUnits < 61) {
    totalss.new = fixedCharge.new.units_31_60 + 30 * energyCharge.new.units_0_30 + (numberOfUnits - 30) * energyCharge.new.units_31_60;
  } else if (numberOfUnits < 91) {
    totalss.new = fixedCharge.new.units_61_90 + 60 * energyCharge.new.units_0_60 + (numberOfUnits - 60) * energyCharge.new.units_61_90;
  } else if (numberOfUnits < 121) {
    totalss.new = fixedCharge.new.units_91_120 + 60 * energyCharge.new.units_0_60 + 30 * energyCharge.new.units_61_90 + (numberOfUnits - 90) * energyCharge.new.units_91_120;
  } else if (numberOfUnits < 181) {
    totalss.new = fixedCharge.new.units_121_180 + 60 * energyCharge.new.units_0_60 + 30 * energyCharge.new.units_61_90 + 30 * energyCharge.new.units_91_120 + (numberOfUnits - 120) * energyCharge.new.units_121_180;
  } else {
    totalss.new = fixedCharge.new.units_181 + 60 * energyCharge.new.units_0_60 + 30 * energyCharge.new.units_61_90 + 30 * energyCharge.new.units_91_120 + 60 * energyCharge.new.units_121_180 + (numberOfUnits - 180) * energyCharge.new.units_181;
  }


  return {
    previous: totalss.previous,
    current: totalss.current,
    new: totalss.new
  }
}


</script>
