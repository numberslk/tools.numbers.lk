

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
      <PageTitle :text="$t('pages.electricity-bill-calculator.title')" class="pt-2 capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <TabGroup as="div" class="flex flex-col md:flex-row md:space-x-4" :vertical="screen.higherThan(Size.MEDIUM)">
          <TabList class="flex w-full mb-2 rounded-lg md:w-1/6 md:flex-col">
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded  text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.electricity-bill-calculator.tabs.domestic') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded  text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.electricity-bill-calculator.tabs.domesticTOU') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded  text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.electricity-bill-calculator.tabs.industrial') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded  text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.electricity-bill-calculator.tabs.general') }}
              </button>
            </HeadlessUiTab>
          </TabList>
          <TabPanels class="flex-1">
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle class="capitalize" :text="$t('pages.electricity-bill-calculator.headings.title')" />
                  <p class="mb-4 text-base leading-snug">
                    {{
                      $t('pages.electricity-bill-calculator.headings.description')
                    }}
                  </p>
                  <div class="flex flex-col lg:flex-row">

                    <div class="relative flex w-full mb-2 lg:w-3/5 lg:mb-0">
                      <FormTextInput v-model="units" class="w-full">
                        <template #prefix-disabled>
                          <span class="flex-1 px-4 py-2"> {{
                            $t('pages.electricity-bill-calculator.other.units')
                          }}</span>
                        </template>
                      </FormTextInput>
                    </div>

                    <div class="relative flex w-full mb-2 lg:mb-0">
                      <div
                        class="flex text-gray-500 border bg-gray-100 border-gray-900/10 rounded-l-sm dark:border-gray-50/[0.2] dark:bg-slate-800">
                        <span class="flex-1 px-2 py-2"><span class="flex-1 px-2 py-2"> {{
                          $t('pages.electricity-bill-calculator.other.period')
                        }}</span></span>
                      </div>
                      <vue-tailwind-datepicker :formatter="formatter" separator=" to " input-classes="bg-transparent"
                        class="w-full rounded-sm dark:bg-transparent dark:focus:border-white focus:border-gray-900 border-gray-900/10 dark:border-gray-50/[0.2]"
                        v-model="dateValue" :shortcuts="customShortcuts" :disable-date="dDate"
                        :options="datePickeroptions" />
                    </div>

                    <Button type="opposite" @click="calculateFinalBill" placeholder="Enter number of Units"
                      class="flex w-full py-2 space-x-1 bg-green-800 lg:w-5/12 lg:mb-0">
                      <icon-ic:baseline-calculate />
                      <span>{{ $t('others.calculate') }}</span>
                    </Button>
                    <MobileTopFixAd2 class="flex items-center justify-center mt-0 text-center md:hidden md:space-x-2" />
                  </div>
                  <div class="flex flex-col mt-2 h-4/6">
                    <!-- Table -->
                    <div
                      class="w-full  bg-white dark:bg-slate-800 border-t border-gray-900/10 dark:border-gray-50/[0.2] border border-gray-200 rounded-sm">
                      <div class="p-2 overflow-x-auto border-b-2 border-gray-100">
                        <table class="w-full table-auto">
                          <thead class="text-xs font-semibold text-gray-400 uppercase bg-gray-50 dark:bg-slate-700">
                            <tr>
                              <th class="p-1">
                                <div class="font-semibold text-left">
                                  {{ $t('pages.electricity-bill-calculator.other.tariff') }}</div>
                              </th>
                              <th class="p-1">
                                <div class="font-semibold text-left">{{
                                  $t('pages.electricity-bill-calculator.other.fixed_charge') }}</div>
                              </th>
                              <th class="p-1">
                                <div class="font-semibold text-left">{{
                                  $t('pages.electricity-bill-calculator.other.energy_charge') }}</div>
                            </th>
                            <!-- <th class="p-1">
                                                                                                                                                                                                                                                                                                                                                                                                                              <div class="font-semibold text-left">Total Before Tax</div>
                                                                                                                                                                                                                                                                                                                                                                                                                            </th> -->
                              <th class="p-1 align-text-top">
                                <div class="font-medium text-left">{{
                                  $t('pages.electricity-bill-calculator.other.total_before_tax') }}</div>
                                <div class="inline-block float-left font-semibold">
                                  {{ $t('pages.electricity-bill-calculator.other.total_with_tax') }}</div>
                              </th>
                            </tr>
                          </thead>

                          <tbody class="text-sm text-gray-800 divide-y divide-gray-100 dark:text-gray-100">
                            <!-- Previous -->
                            <tr>
                              <td class="w-3/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.electricity-bill-calculator.other.tariff_before') }}
                                </div>
                              </td>

                              <td class="w-2/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">{{
                                  applicableFixedCharge.previous.toFixed(2)
                                }}
                                </div>
                              </td>

                              <td class="w-2/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (applicableEnergyCharge.previous).toFixed(2) }}
                                </div>
                              </td>

                            <!-- <td class="w-2/12 p-1">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ totalsBeforeTaxes.previous.toFixed(2) }}
                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                            </td> -->

                              <td class="w-3/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ totalsBeforeTaxes.previous.toFixed(2) }}
                                </div>
                                <div class="text-base font-semibold text-left md:text-lg">
                                  {{ totals.previous.toFixed(2) }}
                                </div>
                              </td>
                            </tr>
                            <!-- Current Bill -->
                            <tr>

                              <td class="w-2/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.electricity-bill-calculator.other.tariff_current') }}
                                </div>
                              </td>

                              <td class="w-2/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">{{
                                  applicableFixedCharge.current.toFixed(2)
                                }}
                                </div>
                              </td>

                              <td class="w-2/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (applicableEnergyCharge.current).toFixed(2) }}
                                </div>
                              </td>

                            <!-- <td class="w-2/12 p-1">
                                <div class="text-base font-medium text-left text-blue-400 md:text-lg">
                                  {{ (totalsBeforeTaxes.current).toFixed(2) }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </td> -->

                              <td class="w-3/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (totalsBeforeTaxes.current).toFixed(2) }}
                                </div>
                                <div class="text-base font-semibold text-left md:text-lg">
                                  {{ (totals.current).toFixed(2) }}
                                </div>
                                <p class="text-xs font-medium text-gray-400">*2.5% SSCL
                                  {{ $t('pages.electricity-bill-calculator.other.included') }}</p>
                              </td>
                            </tr>
                            <tr>

                              <td class="w-3/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.electricity-bill-calculator.other.tariff_now') }}
                                </div>
                              </td>

                              <td class="w-2/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">{{
                                  applicableFixedCharge.new.toFixed(2)
                                }}
                                </div>
                              </td>

                              <td class="w-2/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (applicableEnergyCharge.new).toFixed(2) }}
                                </div>
                              </td>

                            <!-- <td class="w-2/12 p-1">
                                <div class="text-base font-medium text-left text-blue-400 md:text-lg">
                                  {{ (totalsBeforeTaxes.new).toFixed(2) }}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </td> -->

                              <td class="w-3/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (totalsBeforeTaxes.new).toFixed(2) }}
                                </div>
                                <div class="text-base font-semibold text-left md:text-lg">
                                  {{ totals.new.toFixed(2) }}
                                </div>
                                <p class="text-xs font-medium text-gray-400">*2.5% SSCL {{
                                  $t('pages.electricity-bill-calculator.other.included') }}</p>
                              </td>
                            </tr>
                            <!-- record 3 -->
                          </tbody>
                        </table>
                      </div>

                      <!-- total amount -->
                      <div class="float-right">
                        <div class="flex flex-row w-full px-4 pt-1 text-sm font-bold">
                          <div class="mr-2 text-base text-red-400"> {{
                            $t('pages.electricity-bill-calculator.other.new_total_bill') }}</div>
                        </div>

                        <div class="flex flex-row w-full px-4 pt-1 pb-4 space-x-2 text-sm font-bold">

                          <div class="w-9/12 xs:w-auto">
                            <div class="flex flex-col pr-2 border-gray-100">
                              <div class="text-2xl text-left text-red-600 md:text-3xl"> Rs. {{ new
                                Intl.NumberFormat('en-US', {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                  currency: "LKR"
                                }).format(totals.new) }}</div>
                              <p class="text-xs font-medium text-gray-400">*2.5% SSCL {{
                                $t('pages.electricity-bill-calculator.other.included') }}</p>
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
                                      presentageInc.now
                                    }}%)
                                  </span>
                                  <span
                                    class="inline-flex px-1 mt-0 text-xs text-gray-400 align-text-top xs:align-baseline">
                                    {{
                                      $t('pages.electricity-bill-calculator.other.since_feb') }}
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
                                      presentageInc.previous
                                    }}%)
                                  </span>
                                  <span
                                    class="inline-flex px-1 mt-0 text-xs text-gray-400 align-text-top xs:align-baseline">
                                    {{
                                      $t('pages.electricity-bill-calculator.other.since_sep') }}
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
                <CardFooter class="flex flex-col items-center space-y-2 md:space-y md:flex-row md:justify-between">
                  <p>
                  *{{ $t('pages.electricity-bill-calculator.headings.note') }}
                  <!-- <Anchor class="font-bold underline capitalize" :text="
                      $t(
                        'pages.setting.sections.validate_username.footer_link'
                      )
                                                                                                                                                                                                                                                                                                                                                                                                        "
                                                                                                                                                                                                                                                                                                                                                                                                          href="https://docs.github.com/en/rest/users/users#get-a-user" /> -->
                  </p>
                </CardFooter>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle class="capitalize" :text="
                    $t(
                      'others.comming_soon'
                    )
                  " />
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle class="capitalize" :text="
                    $t(
                      'others.comming_soon'
                    )
                  " />
                </CardContent>
              </Card>
            </TabPanel>
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle class="capitalize" :text="
                    $t(
                      'others.comming_soon'
                    )
                  " />
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
import { differenceInDays } from "date-fns"


import TallAd from "~/components/TallAd.vue"
import MobileTopFixAd from "~/components/MobileTopFixAd.vue"
import MobileTopFixAd2 from "~/components/MobileTopFixAd2.vue"
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
    {
      property: 'og:image',
      content: '../assets/images/elec.png',
    },
  ],
}))

// state


// app.component('ByLine', ByLine)

const log = ref<string[]>([])

const date = new Date();
const dateValue = ref()

const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM',
})

const datePickeroptions = ref({
  shortcuts: {
    past: (period: any) => period + ' Days',
    currentMonth: 'Current Months',
    pastMonth: 'Past 30 days'
  },
  footer: {
    apply: 'Apply',
    cancel: 'Cancel'
  }
})

const dDate = (date: any) => {
  return date < new Date(2023, 0, 15);
}

const customShortcuts = () => {
  return [
    {
      label: 'Last 30 Days',
      atClick: () => {
        const today = new Date();
        return [
          new Date(new Date().setDate(today.getDate() - 30)),
          date
        ];
      }
    },
    {
      label: 'Last Month',
      atClick: () => {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth() - 2, 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth() - 1, 0);
        return [
          firstDay,
          lastDay
        ];
      }
    },
    {
      label: 'This Month',
      atClick: () => {
        const date = new Date();
        const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        const lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
        return [
          firstDay,
          lastDay
        ];
      }
    }
  ]
}

const totals = reactive(
  {
    previous: 0,
    current: 0,
    new: 0
  }
)

const totalsBeforeTaxes = reactive({
  previous: 0,
  current: 0,
  new: 0
})

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

const applicableEnergyCharge = reactive(
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

const units = ref()
const enabled = ref(false)
const units2 = ref(0)

onMounted(() => {
  units.value = 0; // <div>
})
// let i = 0;
// let array = [];

// for (i = 0; i < 301; i++) {
//   array[i] = calcElec(i).new
// }

// console.log(array)


function calculateFixCharge(numberOfUnits: number, numberOfDays: number) {

  const numberOfUnitsPer30Days = Math.abs(numberOfUnits) * (30 / Math.abs(numberOfDays));

  let applicableFixedCharge2 = {
    previous: 0,
    current: 0,
    new: 0
  }

  if (numberOfUnitsPer30Days < 31) {
    applicableFixedCharge2.previous = fixedCharge.previous.units_0_30;
    applicableFixedCharge2.current = fixedCharge.current.units_0_30;
    applicableFixedCharge2.new = fixedCharge.new.units_0_30;
  } else if (numberOfUnitsPer30Days < 61) {
    applicableFixedCharge2.previous = fixedCharge.previous.units_31_60;
    applicableFixedCharge2.current = fixedCharge.current.units_31_60;
    applicableFixedCharge2.new = fixedCharge.new.units_31_60;
  } else if (numberOfUnitsPer30Days < 91) {
    applicableFixedCharge2.previous = fixedCharge.previous.units_61_90;
    applicableFixedCharge2.current = fixedCharge.current.units_61_90;
    applicableFixedCharge2.new = fixedCharge.new.units_61_90;
  } else if (numberOfUnitsPer30Days < 121) {
    applicableFixedCharge2.previous = fixedCharge.previous.units_91_120;
    applicableFixedCharge2.current = fixedCharge.current.units_91_120;
    applicableFixedCharge2.new = fixedCharge.new.units_91_120;
  } else if (numberOfUnitsPer30Days < 181) {
    applicableFixedCharge2.previous = fixedCharge.previous.units_121_180;
    applicableFixedCharge2.current = fixedCharge.current.units_121_180;
    applicableFixedCharge2.new = fixedCharge.new.units_121_180;
  } else {
    applicableFixedCharge2.previous = fixedCharge.previous.units_181;
    applicableFixedCharge2.current = fixedCharge.current.units_181;
    applicableFixedCharge2.new = fixedCharge.new.units_181;
  }

  //montly adjesment
  if (numberOfDays < 54) {
    applicableFixedCharge2.previous = applicableFixedCharge2.previous;
    applicableFixedCharge2.current = applicableFixedCharge2.current;
    applicableFixedCharge2.new = applicableFixedCharge2.new;

    log.value.push(`Fixed Charge: ${applicableFixedCharge2.previous}`)
    log.value.push(`Fixed Charge: ${applicableFixedCharge2.current}`)
    log.value.push(`Fixed Charge: ${applicableFixedCharge2.new}`)

  } else {
    applicableFixedCharge2.previous = applicableFixedCharge2.previous * numberOfDays / 30;
    applicableFixedCharge2.current = applicableFixedCharge2.current * numberOfDays / 30;
    applicableFixedCharge2.new = applicableFixedCharge2.new * numberOfDays / 30;

    //   log.value.push(`Fixed Charge: ${applicableFixedCharge2.previous} x ${numberOfDays} / 30`);
    //   log.value.push(`Fixed Charge: ${applicableFixedCharge2.current} x ${numberOfDays} / 30`);
    //   log.value.push(`Fixed Charge: ${applicableFixedCharge2.new} x ${numberOfDays} / 30`);

  }

  return applicableFixedCharge2;

}

function calculateEnergyCharge(numberOfUnits: number, numberOfDays: number) {

  const totals2 = {
    previous: 0,
    current: 0,
    new: 0
  }

  let block_30 = Math.floor(30 * (numberOfDays / 30));
  let block_60 = Math.floor(60 * (numberOfDays / 30));
  let block_90 = Math.floor(90 * (numberOfDays / 30));
  let block_120 = Math.floor(120 * (numberOfDays / 30));
  let block_180 = Math.floor(180 * (numberOfDays / 30));

  console.log(block_30, block_60, block_90)

  if (numberOfUnits <= block_30) {
    totals2.previous = numberOfUnits * energyCharge.previous.units_0_30;

  } else if (numberOfUnits < block_60) {
    totals2.previous = block_30 * energyCharge.previous.units_0_30 + (numberOfUnits - block_30) * energyCharge.previous.units_31_60;

  } else if (numberOfUnits < block_90) {
    totals2.previous = block_60 * energyCharge.previous.units_0_60 + (numberOfUnits - block_60) * energyCharge.previous.units_61_90;

  } else if (numberOfUnits < block_120) {

    totals2.previous = block_60 * energyCharge.previous.units_0_60 + (block_90 - block_60) * energyCharge.previous.units_61_90 + (numberOfUnits - block_90) * energyCharge.previous.units_91_120;

  } else if (numberOfUnits < block_180) {
    totals2.previous = block_60 * energyCharge.previous.units_0_60 + (block_90 - block_60) * energyCharge.previous.units_61_90 + (block_120 - block_90) * energyCharge.previous.units_91_120 + (numberOfUnits - block_120) * energyCharge.previous.units_121_180;

  } else {
    totals2.previous = block_60 * energyCharge.previous.units_0_60 + (block_90 - block_60) * energyCharge.previous.units_61_90 + (block_120 - block_90) * energyCharge.previous.units_91_120 + (block_180 - block_120) * energyCharge.previous.units_121_180 + (numberOfUnits - block_180) * energyCharge.previous.units_181;
  }

  //montly adjesment
  if (numberOfUnits <= block_30) {
    totals2.current = numberOfUnits * energyCharge.current.units_0_30;
    log.value.push(`Current Energy Charge 30: Rs.${energyCharge.current.units_0_30} x ${numberOfUnits}`);

  } else if (numberOfUnits < block_60) {
    totals2.current = block_30 * energyCharge.current.units_0_30 + (numberOfUnits - block_30) * energyCharge.current.units_31_60;
    log.value.push(`Current Energy Charge 60: ${block_30} x Rs.${energyCharge.current.units_0_30} + ${numberOfUnits - block_30} x Rs.${energyCharge.current.units_31_60}`);

  } else if (numberOfUnits < block_90) {
    totals2.current = block_60 * energyCharge.current.units_0_60 + (numberOfUnits - block_60) * energyCharge.current.units_61_90;
    log.value.push(`Current Energy Charge 90: ${block_60} x Rs.${energyCharge.current.units_0_60} + ${numberOfUnits - block_60} x Rs.${energyCharge.current.units_61_90}`);

  } else if (numberOfUnits < block_120) {
    totals2.current = block_60 * energyCharge.current.units_0_60 + (block_90 - block_60) * energyCharge.current.units_61_90 + (numberOfUnits - block_90) * energyCharge.current.units_91_120;
    log.value.push(`${block_60} x Rs.${energyCharge.current.units_0_60} + ${block_90 - block_60} x Rs.${energyCharge.current.units_61_90} + ${(numberOfUnits - block_90)} x Rs.${energyCharge.current.units_91_120}`);

  } else if (numberOfUnits < block_180) {
    totals2.current = block_60 * energyCharge.current.units_0_60 + (block_90 - block_60) * energyCharge.current.units_61_90 + (block_120 - block_90) * energyCharge.current.units_91_120 + (numberOfUnits - block_120) * energyCharge.current.units_121_180;
    log.value.push(`${block_60} x Rs.${energyCharge.current.units_0_60} + ${block_90 - block_60} x Rs.${energyCharge.current.units_61_90} + ${block_120 - block_90} x Rs.${energyCharge.current.units_91_120} + ${numberOfUnits - block_120} x Rs.${energyCharge.current.units_121_180}`);

  } else {
    totals2.current = block_60 * energyCharge.current.units_0_60 + (block_90 - block_60) * energyCharge.current.units_61_90 + (block_120 - block_90) * energyCharge.current.units_91_120 + (block_180 - block_120) * energyCharge.current.units_121_180 + (numberOfUnits - block_180) * energyCharge.current.units_181;
    log.value.push(`${block_60} x Rs.${energyCharge.current.units_0_60} + ${block_90 - block_60} x Rs.${energyCharge.current.units_61_90} + ${block_120 - block_90} x Rs.${energyCharge.current.units_91_120} + ${block_180 - block_120} x Rs.${energyCharge.current.units_121_180} + ${(numberOfUnits - block_180)} x Rs.${energyCharge.current.units_181}`);
  }

  if (numberOfUnits <= block_30) {
    totals2.new = numberOfUnits * energyCharge.new.units_0_30;
    log.value.push(`New Energy Charge 30: Rs.${energyCharge.new.units_0_30} x ${numberOfUnits}`);

  } else if (numberOfUnits < block_60) {
    totals2.new = block_30 * energyCharge.new.units_0_30 + (numberOfUnits - block_30) * energyCharge.new.units_31_60;
    log.value.push(`New Energy Charge 60: ${block_30} x Rs.${energyCharge.new.units_0_30} + ${numberOfUnits - block_30} x Rs.${energyCharge.new.units_31_60}`);

  } else if (numberOfUnits < block_90) {
    totals2.new = block_60 * energyCharge.new.units_0_60 + (numberOfUnits - block_60) * energyCharge.new.units_61_90;
    log.value.push(`New Energy Charge 90: ${block_60} x Rs.${energyCharge.new.units_0_60} + ${numberOfUnits - block_60} x Rs.${energyCharge.new.units_61_90}`);

  } else if (numberOfUnits < block_120) {

    totals2.new = block_60 * energyCharge.new.units_0_60 + (block_90 - block_60) * energyCharge.new.units_61_90 + (numberOfUnits - block_90) * energyCharge.new.units_91_120;
    log.value.push(`New Energy Charge 120: ${block_60} x Rs.${energyCharge.new.units_0_60} + ${block_90 - block_60} x Rs.${energyCharge.new.units_61_90} + ${(numberOfUnits - block_90)} x Rs.${energyCharge.new.units_91_120}`);

  } else if (numberOfUnits < block_180) {
    totals2.new = block_60 * energyCharge.new.units_0_60 + (block_90 - block_60) * energyCharge.new.units_61_90 + (block_120 - block_90) * energyCharge.new.units_91_120 + (numberOfUnits - block_120) * energyCharge.new.units_121_180;
    log.value.push(`New Energy Charge 180: ${block_60} x Rs.${energyCharge.new.units_0_60} + ${block_90 - block_60} x Rs.${energyCharge.new.units_61_90} + ${(numberOfUnits - block_90)} x Rs.${energyCharge.new.units_91_120} + ${(numberOfUnits - block_120)} x Rs.${energyCharge.new.units_121_180}`);

  } else {
    totals2.new = block_60 * energyCharge.new.units_0_60 + (block_90 - block_60) * energyCharge.new.units_61_90 + (block_120 - block_90) * energyCharge.new.units_91_120 + (block_180 - block_120) * energyCharge.new.units_121_180 + (numberOfUnits - block_180) * energyCharge.new.units_181;
    log.value.push(`New Energy Charge 180+: ${block_60} x Rs.${energyCharge.new.units_0_60} + ${block_90 - block_60} x Rs.${energyCharge.new.units_61_90} + ${(block_120 - block_90)} x Rs.${energyCharge.new.units_91_120} + ${(block_180 - block_120)} x Rs.${energyCharge.new.units_121_180} + ${(numberOfUnits - block_180)} x ${energyCharge.new.units_181}`);
  }
  return totals2;
}

function calculateFinalBill() {

  const dateDiffFromFeb15th = differenceInDays(new Date(dateValue.value[0]), new Date("2023 Feb 14"));
  const dateDiffSinceFeb15th = differenceInDays(new Date(dateValue.value[1]), new Date("2023 Feb 14"));


  if ((dateDiffFromFeb15th <= 0) && !(dateDiffSinceFeb15th <= 0)) {
    const numberOfUnits = units.value;

    const numberOfDaysTill15th = differenceInDays(new Date("2023 Feb 14"), new Date(dateValue.value[0]));
    const numberOfDaysFrom15th = differenceInDays(new Date(dateValue.value[1]), new Date("2023 Feb 14"));
    const totalNumberOfDays = numberOfDaysTill15th + numberOfDaysFrom15th;

    const fixCharge = calculateFixCharge(Number(numberOfUnits), totalNumberOfDays);
    const unitCharge = calculateEnergyCharge(Number(numberOfUnits), totalNumberOfDays);

    const dailyConsumption = Number(numberOfUnits) / totalNumberOfDays;
    const monthlyConsumption = dailyConsumption * 30;

    const unitChargePerviousTariff = calculateEnergyCharge(Math.ceil(dailyConsumption * numberOfDaysTill15th), numberOfDaysTill15th);

    const fixChargeNewTariff = calculateFixCharge(monthlyConsumption, totalNumberOfDays);

    const unitChargeNewTariff = calculateEnergyCharge((Math.floor(dailyConsumption * numberOfDaysFrom15th)), numberOfDaysFrom15th);

    applicableFixedCharge.previous = fixCharge.previous;
    applicableEnergyCharge.previous = unitCharge.previous;
    totalsBeforeTaxes.previous = applicableFixedCharge.previous + applicableEnergyCharge.previous;

    applicableFixedCharge.current = fixCharge.current;
    applicableEnergyCharge.current = unitCharge.current;
    totalsBeforeTaxes.current = applicableFixedCharge.current + applicableEnergyCharge.current;

    //before 15th, old tariff should apply
    applicableFixedCharge.new = applicableFixedCharge.current * numberOfDaysTill15th / 30 + fixChargeNewTariff.new * numberOfDaysFrom15th / 30;


    applicableEnergyCharge.new = unitChargePerviousTariff.current + unitChargeNewTariff.new;

    totalsBeforeTaxes.new = applicableFixedCharge.new + applicableEnergyCharge.new;

    totals.previous = totalsBeforeTaxes.previous;
    totals.current = totalsBeforeTaxes.current + totalsBeforeTaxes.current * 2.5 / 97.5;
    totals.new = totalsBeforeTaxes.new + totalsBeforeTaxes.new * 2.5 / 97.5;

    presentageInc.previous = ((totals.new - totals.previous) * 100 / totals.previous).toFixed(0);
    presentageInc.now = ((totals.new - totals.current) * 100 / totals.current).toFixed(0);

    console.log(log.value)
  } else {
    calculateElecBill();
  }
}

function calculateElecBill() {

  const numberOfUnits = Number(units.value);
  //old and new

  const numberOfDays = differenceInDays(new Date(dateValue.value[1]), new Date(dateValue.value[0]));

  const fixCharge = calculateFixCharge(numberOfUnits, numberOfDays);
  const unitCharge = calculateEnergyCharge(numberOfUnits, numberOfDays);

  //montly adjesment

  applicableFixedCharge.previous = fixCharge.previous;
  applicableFixedCharge.current = fixCharge.current;
  applicableFixedCharge.new = fixCharge.new;

  applicableEnergyCharge.previous = unitCharge.previous;
  applicableEnergyCharge.current = unitCharge.current;
  applicableEnergyCharge.new = unitCharge.new;

  totalsBeforeTaxes.previous = applicableFixedCharge.previous + applicableEnergyCharge.previous;
  totalsBeforeTaxes.current = applicableFixedCharge.current + applicableEnergyCharge.current;
  totalsBeforeTaxes.new = applicableFixedCharge.new + applicableEnergyCharge.new;

  totals.previous = totalsBeforeTaxes.previous;
  totals.current = totalsBeforeTaxes.current + totalsBeforeTaxes.current * 2.5 / 97.5;
  totals.new = totalsBeforeTaxes.new + totalsBeforeTaxes.new * 2.5 / 97.5;


  presentageInc.previous = ((totals.new - totals.previous) * 100 / totals.previous).toFixed(0);
  presentageInc.now = ((totals.new - totals.current) * 100 / totals.current).toFixed(0);
}


function calculateElecBillNew() {

  const numberOfUnits = Number(units.value);

  const numberOfDays = differenceInDays(new Date(dateValue.value[1]), new Date(dateValue.value[0]));

  const fixCharge = calculateFixCharge(numberOfUnits, numberOfDays);
  const unitCharge = calculateEnergyCharge(numberOfUnits, numberOfDays);

  //montly adjesment

  applicableFixedCharge.previous = fixCharge.previous;
  applicableFixedCharge.current = fixCharge.current;
  applicableFixedCharge.new = fixCharge.new;

  applicableEnergyCharge.previous = unitCharge.previous;
  applicableEnergyCharge.current = unitCharge.current;
  applicableEnergyCharge.new = unitCharge.new;

  totalsBeforeTaxes.previous = applicableFixedCharge.previous + applicableEnergyCharge.previous;
  totalsBeforeTaxes.current = applicableFixedCharge.current + applicableEnergyCharge.current;
  totalsBeforeTaxes.new = applicableFixedCharge.new + applicableEnergyCharge.new;

  totals.previous = totalsBeforeTaxes.previous;
  totals.current = totalsBeforeTaxes.current + totalsBeforeTaxes.current * 2.5 / 97.5;
  totals.new = totalsBeforeTaxes.new + totalsBeforeTaxes.new * 2.5 / 97.5;

  presentageInc.previous = ((totals.new - totals.previous) * 100 / totals.previous).toFixed(0);
  presentageInc.now = ((totals.new - totals.current) * 100 / totals.current).toFixed(0);

}

</script>
