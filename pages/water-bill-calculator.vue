

<template>
  <PageWrapper>
  <!-- <PageSection class="mb-0">
      <Alert type="success" title="This is a page for testing purposes"
                                                                                                  text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </PageSection> -->
    <MobileTopFixAd class="flex items-center justify-center mt-4 text-center md:hidden md:space-x-4" />
    <PageTopAd class="items-center justify-center hidden mt-4 text-center md:flex md:space-x-4" />
    <PageHeader>
      <PageTitle :text="$t('pages.water-bill-calculator.title')" class="pt-2 capitalize" />
    </PageHeader>
    <PageBody>
      <PageSection>
        <TabGroup as="div" @change="changeTab" :selectedIndex="selectedTab" class="flex flex-col md:flex-row md:space-x-4"
          :vertical="screen.higherThan(Size.MEDIUM)">
          <TabList class="flex w-full mb-2 rounded-lg md:w-1/6 md:flex-col">
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded  text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.water-bill-calculator.tabs.samurdhi') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded  text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.water-bill-calculator.tabs.state') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded  text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.water-bill-calculator.tabs.domestic') }}
              </button>
            </HeadlessUiTab>
            <HeadlessUiTab v-slot="{ selected }" as="template">
              <button :class="[
                'md:w-full text-left px-3 py-1.5 rounded  text-sm leading-5 transition-all hover:bg-gray-200 hover:text-slate-900 dark:hover:bg-white/[0.12] dark:hover:text-white',
                selected
                  ? 'font-extrabold'
                  : 'text-slate-800 dark:text-gray-400',
              ]">
                {{ $t('pages.water-bill-calculator.tabs.general') }}
              </button>
            </HeadlessUiTab>
          </TabList>
          <TabPanels class="flex-1">
            <TabPanel>
              <Card class="mb-4">
                <CardContent>
                  <CardTitle class="inline-block pr-2 capitalize"
                    :text="$t('pages.water-bill-calculator.headings.title')" />
                  <CardTitle class="text-blue-500 capitalize align-top md:inline-block">
                    ({{ $t('pages.water-bill-calculator.tabs.samurdhi') }})</CardTitle>
                  <p class="mb-4 leading-snug">
                    {{
                      $t('pages.water-bill-calculator.headings.description')
                    }}
                  </p>
                  <div class="flex flex-col lg:flex-row">
                    <div class="relative flex w-full mb-2 lg:mb-0">
                      <FormTextInput v-model="enteredNumberOfUnits" class="w-full">
                        <template #prefix-disabled>
                          <span class="flex-1 px-4 py-2"> {{
                            $t('pages.water-bill-calculator.other.units')
                          }}</span>
                        </template>
                      </FormTextInput>
                    </div>
                    <div class="relative flex w-full mb-2 md:mb-0">
                      <div
                        class="flex text-gray-500 border bg-gray-100 border-gray-900/10 rounded-l-sm dark:border-gray-50/[0.2] dark:bg-slate-800">
                        <span class="flex-1 px-4 py-2"><span class="flex-1 px-4 py-2"> {{
                          $t('pages.water-bill-calculator.other.period')
                        }}</span></span>
                      </div>
                      <vue-tailwind-datepicker :formatter="formatter" separator=" to "
                        class="w-full rounded-none rounded-r-md dark:bg-transparent dark:focus:border-white focus:border-gray-900 border-gray-900/10 dark:border-gray-50/[0.2]"
                        v-model="dateValue" />
                    </div>

                    <Button type="opposite" @click="calculateWaterBill" placeholder="Enter number of Units"
                      class="flex mb-2 space-x-1 border-none md:mb-0">
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
                                  {{ $t('pages.water-bill-calculator.other.tariff') }}</div>
                              </th>
                              <th class="p-1">
                                <div class="font-semibold text-left">{{
                                  $t('pages.water-bill-calculator.other.fixed_charge') }}</div>
                              </th>
                              <th class="p-1">
                                <div class="font-semibold text-left">{{
                                  $t('pages.water-bill-calculator.other.energy_charge') }}</div>
                            </th>
                            <!-- <th class="p-1">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <div class="font-semibold text-left">Total Before Tax</div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </th> -->
                              <th class="p-1 align-text-top">
                                <div class="font-medium text-left">{{
                                  $t('pages.water-bill-calculator.other.total_before_tax') }}</div>
                                <div class="inline-block float-left font-semibold">
                                  {{ $t('pages.water-bill-calculator.other.total_with_tax') }}</div>
                              </th>
                            </tr>
                          </thead>

                          <tbody class="text-sm text-gray-800 divide-y divide-gray-100 dark:text-gray-100">
                            <!-- Previous -->
                            <tr>
                              <td class="w-3/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_before') }}
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
                                  {{ (applicableUnitCharge.previous).toFixed(2) }}
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
                          <!-- <tr>

                              <td class="w-2/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_current') }}
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
                                  {{ (applicableUnitCharge.current).toFixed(2) }}
                                </div>
                              </td>

                              <td class="w-3/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (totalsBeforeTaxes.current).toFixed(2) }}
                                </div>
                                <div class="text-base font-semibold text-left md:text-lg">
                                  {{ (totals.current).toFixed(2) }}
                                </div>
                                <p class="text-xs font-medium text-gray-400">15% VAT included</p>
                                                                                                            </td>
                                                                                                            </tr>-->
                            <tr>
                              <td class="w-3/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_now') }}
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
                                  {{ (applicableUnitCharge.new).toFixed(2) }}
                                </div>
                              </td>
                              <td class="w-3/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (totalsBeforeTaxes.new).toFixed(2) }}
                                </div>
                                <div class="text-base font-semibold text-left md:text-lg">
                                  {{ totals.new.toFixed(2) }}
                                </div>
                                <p class="text-xs font-medium text-gray-400">*15% VAT {{
                                  $t('pages.water-bill-calculator.other.included') }}</p>
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
                            $t('pages.water-bill-calculator.other.new_total_bill') }}</div>
                        </div>

                        <div class="flex flex-row w-full px-4 pt-1 pb-4 space-x-2 text-sm font-bold">

                          <div class="w-9/12 xs:w-auto">
                            <div class="flex flex-col pr-2 border-gray-100">
                              <div class="text-2xl text-left text-red-600 md:text-3xl"> Rs. {{ new
                                Intl.NumberFormat('en-US', {
                                  maximumFractionDigits: 2,
                                  currency: "LKR"
                                }).format(totals.new) }}</div>
                              <p class="text-xs font-medium text-gray-400">*15% VAT {{
                                $t('pages.water-bill-calculator.other.included') }}</p>
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
                                      $t('pages.water-bill-calculator.other.since_feb') }}
                                  </span>
                                </div>
                            </div>
                            <!-- <div class="px-2">
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
                                      $t('pages.water-bill-calculator.other.since_sep') }}
                                  </span>
                                                                                                            </div>
                                                                                                          </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter class="flex flex-col items-center space-y-2 md:space-y md:flex-row md:justify-between">
                  <p>
                  *{{ $t('pages.water-bill-calculator.headings.note') }}
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
                  <CardTitle class="inline-block pr-2 capitalize"
                    :text="$t('pages.water-bill-calculator.headings.title')" />
                  <CardTitle class="text-blue-500 capitalize align-top md:inline-block">
                    ({{ $t('pages.water-bill-calculator.tabs.state') }})</CardTitle>
                  <p class="mb-4 leading-snug">
                    {{
                      $t('pages.water-bill-calculator.headings.description')
                    }}
                  </p>
                  <div class="flex flex-col lg:flex-row">
                    <div class="relative flex w-full mb-2 lg:mb-0">
                      <FormTextInput v-model="enteredNumberOfUnits" class="w-full">
                        <template #prefix-disabled>
                          <span class="flex-1 px-4 py-2"> {{
                            $t('pages.water-bill-calculator.other.units')
                          }}</span>
                        </template>
                      </FormTextInput>
                    </div>
                    <div class="relative flex w-full mb-2 md:mb-0">
                      <div
                        class="flex text-gray-500 border bg-gray-100 border-gray-900/10 rounded-l-sm dark:border-gray-50/[0.2] dark:bg-slate-800">
                        <span class="flex-1 px-4 py-2"><span class="flex-1 px-4 py-2"> {{
                          $t('pages.water-bill-calculator.other.period')
                        }}</span></span>
                      </div>
                      <vue-tailwind-datepicker :formatter="formatter" separator=" to "
                        class="w-full rounded-none rounded-r-md dark:bg-transparent dark:focus:border-white focus:border-gray-900 border-gray-900/10 dark:border-gray-50/[0.2]"
                        v-model="dateValue" />
                    </div>

                    <Button type="opposite" @click="calculateWaterBill" placeholder="Enter number of Units"
                      class="flex mb-2 space-x-1 border-none md:mb-0">
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
                                  {{ $t('pages.water-bill-calculator.other.tariff') }}</div>
                              </th>
                              <th class="p-1">
                                <div class="font-semibold text-left">{{
                                  $t('pages.water-bill-calculator.other.fixed_charge') }}</div>
                              </th>
                              <th class="p-1">
                                <div class="font-semibold text-left">{{
                                  $t('pages.water-bill-calculator.other.energy_charge') }}</div>
                            </th>
                            <!-- <th class="p-1">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <div class="font-semibold text-left">Total Before Tax</div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </th> -->
                              <th class="p-1 align-text-top">
                                <div class="font-medium text-left">{{
                                  $t('pages.water-bill-calculator.other.total_before_tax') }}</div>
                                <div class="inline-block float-left font-semibold">
                                  {{ $t('pages.water-bill-calculator.other.total_with_tax') }}</div>
                              </th>
                            </tr>
                          </thead>

                          <tbody class="text-sm text-gray-800 divide-y divide-gray-100 dark:text-gray-100">
                            <!-- Previous -->
                            <tr>
                              <td class="w-3/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_before') }}
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
                                  {{ (applicableUnitCharge.previous).toFixed(2) }}
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
                          <!-- <tr>
                              <td class="w-2/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_current') }}
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
                                  {{ (applicableUnitCharge.current).toFixed(2) }}
                                </div>
                              </td>
                              <td class="w-3/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (totalsBeforeTaxes.current).toFixed(2) }}
                                </div>
                                <div class="text-base font-semibold text-left md:text-lg">
                                  {{ (totals.current).toFixed(2) }}
                                </div>
                                <p class="text-xs font-medium text-gray-400">15% VAT included</p>
                                                                                          </td>
                                                                                        </tr> -->
                            <tr>

                              <td class="w-3/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_now') }}
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
                                  {{ (applicableUnitCharge.new).toFixed(2) }}
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
                                <p class="text-xs font-medium text-gray-400">*15% VAT {{
                                  $t('pages.water-bill-calculator.other.included') }}</p>
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
                            $t('pages.water-bill-calculator.other.new_total_bill') }}</div>
                        </div>

                        <div class="flex flex-row w-full px-4 pt-1 pb-4 space-x-2 text-sm font-bold">

                          <div class="w-9/12 xs:w-auto">
                            <div class="flex flex-col pr-2 border-gray-100">
                              <div class="text-2xl text-left text-red-600 md:text-3xl"> Rs. {{ new
                                Intl.NumberFormat('en-US', {
                                  maximumFractionDigits: 2,
                                  currency: "LKR"
                                }).format(totals.new) }}</div>
                              <p class="text-xs font-medium text-gray-400">*15% VAT {{
                                $t('pages.water-bill-calculator.other.included') }}</p>
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
                                      $t('pages.water-bill-calculator.other.since_feb') }}
                                  </span>
                                </div>
                            </div>
                            <!-- <div class="px-2">
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
                                      $t('pages.water-bill-calculator.other.since_sep') }}
                                  </span>
                                                                                      </div>
                                                                                    </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter class="flex flex-col items-center space-y-2 md:space-y md:flex-row md:justify-between">
                  <p>
                  *{{ $t('pages.water-bill-calculator.headings.note') }}
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
                  <CardTitle class="inline-block pr-2 capitalize"
                    :text="$t('pages.water-bill-calculator.headings.title')" />
                  <CardTitle class="text-blue-500 capitalize align-top md:inline-block">
                    ({{ $t('pages.water-bill-calculator.tabs.domestic') }})</CardTitle>
                  <p class="mb-4 leading-snug">
                    {{
                      $t('pages.water-bill-calculator.headings.description')
                    }}
                  </p>
                  <div class="flex flex-col lg:flex-row">
                    <div class="relative flex w-full mb-2 lg:mb-0">
                      <FormTextInput v-model="enteredNumberOfUnits" class="w-full">
                        <template #prefix-disabled>
                          <span class="flex-1 px-4 py-2"> {{
                            $t('pages.water-bill-calculator.other.units')
                          }}</span>
                        </template>
                      </FormTextInput>
                    </div>
                    <div class="relative flex w-full mb-2 md:mb-0">
                      <div
                        class="flex text-gray-500 border bg-gray-100 border-gray-900/10 rounded-l-sm dark:border-gray-50/[0.2] dark:bg-slate-800">
                        <span class="flex-1 px-4 py-2"><span class="flex-1 px-4 py-2"> {{
                          $t('pages.water-bill-calculator.other.period')
                        }}</span></span>
                      </div>
                      <vue-tailwind-datepicker :formatter="formatter" separator=" to "
                        class="w-full rounded-none rounded-r-md dark:bg-transparent dark:focus:border-white focus:border-gray-900 border-gray-900/10 dark:border-gray-50/[0.2]"
                        v-model="dateValue" />
                    </div>

                    <Button type="opposite" @click="calculateWaterBill" placeholder="Enter number of Units"
                      class="flex mb-2 space-x-1 border-none md:mb-0">
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
                                  {{ $t('pages.water-bill-calculator.other.tariff') }}</div>
                              </th>
                              <th class="p-1">
                                <div class="font-semibold text-left">{{
                                  $t('pages.water-bill-calculator.other.fixed_charge') }}</div>
                              </th>
                              <th class="p-1">
                                <div class="font-semibold text-left">{{
                                  $t('pages.water-bill-calculator.other.energy_charge') }}</div>
                            </th>
                            <!-- <th class="p-1">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <div class="font-semibold text-left">Total Before Tax</div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </th> -->
                              <th class="p-1 align-text-top">
                                <div class="font-medium text-left">{{
                                  $t('pages.water-bill-calculator.other.total_before_tax') }}</div>
                                <div class="inline-block float-left font-semibold">
                                  {{ $t('pages.water-bill-calculator.other.total_with_tax') }}</div>
                              </th>
                            </tr>
                          </thead>

                          <tbody class="text-sm text-gray-800 divide-y divide-gray-100 dark:text-gray-100">
                            <!-- Previous -->
                            <tr>
                              <td class="w-3/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_before') }}
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
                                  {{ (applicableUnitCharge.previous).toFixed(2) }}
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
                          <!-- <tr>
                              <td class="w-2/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_current') }}
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
                                  {{ (applicableUnitCharge.current).toFixed(2) }}
                                </div>
                              </td>
                              <td class="w-3/12 p-1 align-text-top">
                                <div class="text-base font-medium text-left md:text-lg">
                                  {{ (totalsBeforeTaxes.current).toFixed(2) }}
                                </div>
                                <div class="text-base font-semibold text-left md:text-lg">
                                  {{ (totals.current).toFixed(2) }}
                                </div>
                                <p class="text-xs font-medium text-gray-400">15% VAT included</p>
                                                                                        </td>
                                                                                      </tr> -->
                            <tr>

                              <td class="w-3/12 p-1 align-text-top">
                                <div class="font-medium">
                                  {{ $t('pages.water-bill-calculator.other.tariff_now') }}
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
                                  {{ (applicableUnitCharge.new).toFixed(2) }}
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
                                <p class="text-xs font-medium text-gray-400">*15% VAT {{
                                  $t('pages.water-bill-calculator.other.included') }}</p>
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
                            $t('pages.water-bill-calculator.other.new_total_bill') }}</div>
                        </div>

                        <div class="flex flex-row w-full px-4 pt-1 pb-4 space-x-2 text-sm font-bold">

                          <div class="w-9/12 xs:w-auto">
                            <div class="flex flex-col pr-2 border-gray-100">
                              <div class="text-2xl text-left text-red-600 md:text-3xl"> Rs. {{ new
                                Intl.NumberFormat('en-US', {
                                  maximumFractionDigits: 2,
                                  currency: "LKR"
                                }).format(totals.new) }}</div>
                              <p class="text-xs font-medium text-gray-400">*15% VAT {{
                                $t('pages.water-bill-calculator.other.included') }}</p>
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
                                      $t('pages.water-bill-calculator.other.since_feb') }}
                                  </span>
                                </div>
                            </div>
                            <!-- <div class="px-2">
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
                                      $t('pages.water-bill-calculator.other.since_sep') }}
                                  </span>
                                                                                        </div>
                                                                                      </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter class="flex flex-col items-center space-y-2 md:space-y md:flex-row md:justify-between">
                  <p>
                  *{{ $t('pages.water-bill-calculator.headings.note') }}
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
  title: capitalize(t('pages.water-bill-calculator.title')),
  meta: [
    {
      name: 'description',
      content: t('pages.water-bill-calculator.description'),
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

const log = ref<string[]>([])

const dateValue = ref([])
const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM',
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

const applicableUnitCharge = reactive(
  {
    previous: 0,
    current: 0,
    new: 0
  }
)

const applicableTax
  = reactive(
    {
      previous: 0,
      current: 0,
      new: 0
    }
  )

const selectedTab = ref(0)

function changeTab(index) {
  selectedTab.value = index

  totalsBeforeTaxes.previous = 0;
  totalsBeforeTaxes.current = 0;
  totalsBeforeTaxes.new = 0;

  applicableUnitCharge.previous = 0;
  applicableUnitCharge.current = 0;
  applicableUnitCharge.new = 0;

  applicableTax.previous = 0;
  applicableTax.current = 0;
  applicableTax.new = 0;

  applicableFixedCharge.previous = 0;
  applicableFixedCharge.current = 0;
  applicableFixedCharge.new = 0;

  applicableFixedCharge.previous = 0;
  applicableFixedCharge.current = 0;
  applicableFixedCharge.new = 0;

  totals.previous = 0;
  totals.current = 0;
  totals.new = 0;

  presentageInc.previous = "";
  presentageInc.now = "";

}


const tabNames = ref(['Samurdhi Recipients', 'State', 'DOMESTIC']);

const charges = reactive(
  {
    previous: {
      units_00_05: {
        samurdhi: {
          unit: 5,
          service: 50
        },
        wathu: {
          unit: 8,
          service: 50
        },
        normal: {
          unit: 12,
          service: 50
        }
      },
      units_06_10: {
        samurdhi: {
          unit: 10,
          service: 50
        },
        wathu: {
          unit: 11,
          service: 65
        },
        normal: {
          unit: 16,
          service: 65
        }
      },
      units_11_15: {
        samurdhi: {
          unit: 15,
          service: 50
        },
        wathu: {
          unit: 20,
          service: 70
        },
        normal: {
          unit: 20,
          service: 70
        }
      },
      units_16_20: {
        samurdhi: {
          unit: 40,
          service: 80
        },
        wathu: {
          unit: 40,
          service: 80
        },
        normal: {
          unit: 48,
          service: 80
        }
      },
      units_21_25: {
        samurdhi: {
          unit: 58,
          service: 100
        },
        wathu: {
          unit: 58,
          service: 100
        },
        normal: {
          unit: 58,
          service: 100
        }
      },
      units_26_30: {
        samurdhi: {
          unit: 88,
          service: 200
        },
        wathu: {
          unit: 88,
          service: 200
        },
        normal: {
          unit: 88,
          service: 200
        }
      },
      units_31_40: {
        samurdhi: {
          unit: 105,
          service: 400
        },
        wathu: {
          unit: 105,
          service: 400
        },
        normal: {
          unit: 105,
          service: 400
        }
      },
      units_41_50: {
        samurdhi: {
          unit: 120,
          service: 650
        },
        wathu: {
          unit: 120,
          service: 650
        },
        normal: {
          unit: 120,
          service: 650
        }
      },
      units_51_75: {
        samurdhi: {
          unit: 130,
          service: 1000
        },
        wathu: {
          unit: 130,
          service: 1000
        },
        normal: {
          unit: 130,
          service: 100
        }
      },
      units_76: {
        samurdhi: {
          unit: 140,
          service: 1600
        },
        wathu: {
          unit: 140,
          service: 1600
        },
        normal: {
          unit: 140,
          service: 1600
        }
      }
    },

    current: {
      units_00_05: {
        samurdhi: {
          unit: 5,
          service: 100
        },
        wathu: {
          unit: 8,
          service: 100
        },
        normal: {
          unit: 20,
          service: 300
        }
      },
      units_06_10: {
        samurdhi: {
          unit: 10,
          service: 100
        },
        wathu: {
          unit: 11,
          service: 100
        },
        normal: {
          unit: 27,
          service: 300
        }
      },
      units_11_15: {
        samurdhi: {
          unit: 15,
          service: 100
        },
        wathu: {
          unit: 20,
          service: 100
        },
        normal: {
          unit: 34,
          service: 300
        }
      },
      units_16_20: {
        samurdhi: {
          unit: 40,
          service: 100
        },
        wathu: {
          unit: 40,
          service: 100
        },
        normal: {
          unit: 68,
          service: 300
        }
      },
      units_21_25: {
        samurdhi: {
          unit: 58,
          service: 100
        },
        wathu: {
          unit: 58,
          service: 100
        },
        normal: {
          unit: 99,
          service: 300
        }
      },
      units_26_30: {
        samurdhi: {
          unit: 88,
          service: 200
        },
        wathu: {
          unit: 88,
          service: 200
        },
        normal: {
          unit: 150,
          service: 900
        }
      },
      units_31_40: {
        samurdhi: {
          unit: 105,
          service: 400
        },
        wathu: {
          unit: 105,
          service: 400
        },
        normal: {
          unit: 179,
          service: 900
        }
      },
      units_41_50: {
        samurdhi: {
          unit: 120,
          service: 650
        },
        wathu: {
          unit: 120,
          service: 650
        },
        normal: {
          unit: 204,
          service: 2400
        }
      },
      units_51_75: {
        samurdhi: {
          unit: 130,
          service: 1000
        },
        wathu: {
          unit: 130,
          service: 1000
        },
        normal: {
          unit: 221,
          service: 2400
        }
      },
      units_76: {
        samurdhi: {
          unit: 140,
          service: 1600
        },
        wathu: {
          unit: 140,
          service: 1600
        },
        normal: {
          unit: 238,
          service: 3500
        }
      }
    },
    new: {
      units_00_05: {
        samurdhi: {
          unit: 5,
          service: 100
        },
        wathu: {
          unit: 8,
          service: 100
        },
        normal: {
          unit: 20,
          service: 300
        }
      },
      units_06_10: {
        samurdhi: {
          unit: 10,
          service: 100
        },
        wathu: {
          unit: 11,
          service: 100
        },
        normal: {
          unit: 27,
          service: 300
        }
      },
      units_11_15: {
        samurdhi: {
          unit: 15,
          service: 100
        },
        wathu: {
          unit: 20,
          service: 100
        },
        normal: {
          unit: 34,
          service: 300
        }
      },
      units_16_20: {
        samurdhi: {
          unit: 40,
          service: 100
        },
        wathu: {
          unit: 40,
          service: 100
        },
        normal: {
          unit: 68,
          service: 300
        }
      },
      units_21_25: {
        samurdhi: {
          unit: 58,
          service: 100
        },
        wathu: {
          unit: 58,
          service: 100
        },
        normal: {
          unit: 99,
          service: 300
        }
      },
      units_26_30: {
        samurdhi: {
          unit: 88,
          service: 200
        },
        wathu: {
          unit: 88,
          service: 200
        },
        normal: {
          unit: 150,
          service: 900
        }
      },
      units_31_40: {
        samurdhi: {
          unit: 105,
          service: 400
        },
        wathu: {
          unit: 105,
          service: 400
        },
        normal: {
          unit: 179,
          service: 900
        }
      },
      units_41_50: {
        samurdhi: {
          unit: 120,
          service: 650
        },
        wathu: {
          unit: 120,
          service: 650
        },
        normal: {
          unit: 204,
          service: 2400
        }
      },
      units_51_75: {
        samurdhi: {
          unit: 130,
          service: 1000
        },
        wathu: {
          unit: 130,
          service: 1000
        },
        normal: {
          unit: 221,
          service: 2400
        }
      },
      units_76: {
        samurdhi: {
          unit: 140,
          service: 1600
        },
        wathu: {
          unit: 140,
          service: 1600
        },
        normal: {
          unit: 238,
          service: 3500
        }
      }
    }
  }
)

const enteredNumberOfUnits = ref(0)
const enabled = ref(false)

function calculateWaterBillFixedCharge(category, units, setting) {

  if (setting == "previous") {
    if (category == 1) {
      if (units <= 5) {
        return charges.previous.units_00_05.samurdhi.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.previous.units_06_10.samurdhi.service;
      } else if ((units > 10) && units <= 15) {
        return charges.previous.units_11_15.samurdhi.service;
      } else if ((units > 15) && units <= 20) {
        return charges.previous.units_16_20.samurdhi.service;
      } else if ((units > 20) && units <= 25) {
        return charges.previous.units_21_25.samurdhi.service;
      } else if ((units > 25) && units <= 30) {
        return charges.previous.units_26_30.samurdhi.service;
      } else if ((units > 30) && units <= 40) {
        return charges.previous.units_31_40.samurdhi.service;
      } else if ((units > 40) && units <= 50) {
        return charges.previous.units_41_50.samurdhi.service;
      } else if ((units > 50) && units <= 75) {
        return charges.previous.units_51_75.samurdhi.service;
      } else {
        return charges.previous.units_76.samurdhi.service;
      }

    } else if (category == 2) {
      if (units <= 5) {
        return charges.previous.units_00_05.wathu.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.previous.units_06_10.wathu.service;
      } else if ((units > 10) && units <= 15) {
        return charges.previous.units_11_15.wathu.service;
      } else if ((units > 15) && units <= 20) {
        return charges.previous.units_16_20.wathu.service;
      } else if ((units > 20) && units <= 25) {
        return charges.previous.units_21_25.wathu.service;
      } else if ((units > 25) && units <= 30) {
        return charges.previous.units_26_30.wathu.service;
      } else if ((units > 30) && units <= 40) {
        return charges.previous.units_31_40.wathu.service;
      } else if ((units > 40) && units <= 50) {
        return charges.previous.units_41_50.wathu.service;
      } else if ((units > 50) && units <= 75) {
        return charges.previous.units_51_75.wathu.service;
      } else {
        return charges.previous.units_76.wathu.service;
      }
    } else {
      if (units <= 5) {
        return charges.previous.units_00_05.normal.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.previous.units_06_10.normal.service;
      } else if ((units > 10) && units <= 15) {
        return charges.previous.units_11_15.normal.service;
      } else if ((units > 15) && units <= 20) {
        return charges.previous.units_16_20.normal.service;
      } else if ((units > 20) && units <= 25) {
        return charges.previous.units_21_25.normal.service;
      } else if ((units > 25) && units <= 30) {
        return charges.previous.units_26_30.normal.service;
      } else if ((units > 30) && units <= 40) {
        return charges.previous.units_31_40.normal.service;
      } else if ((units > 40) && units <= 50) {
        return charges.previous.units_41_50.normal.service;
      } else if ((units > 50) && units <= 75) {
        return charges.previous.units_51_75.normal.service;
      } else {
        return charges.previous.units_76.normal.service;
      }
    }
  } else if (setting == "current") {
    if (category == 1) {
      if (units <= 5) {
        return charges.current.units_00_05.samurdhi.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.current.units_06_10.samurdhi.service;
      } else if ((units > 10) && units <= 15) {
        return charges.current.units_11_15.samurdhi.service;
      } else if ((units > 15) && units <= 20) {
        return charges.current.units_16_20.samurdhi.service;
      } else if ((units > 20) && units <= 25) {
        return charges.current.units_21_25.samurdhi.service;
      } else if ((units > 25) && units <= 30) {
        return charges.current.units_26_30.samurdhi.service;
      } else if ((units > 30) && units <= 40) {
        return charges.current.units_31_40.samurdhi.service;
      } else if ((units > 40) && units <= 50) {
        return charges.current.units_41_50.samurdhi.service;
      } else if ((units > 50) && units <= 75) {
        return charges.current.units_51_75.samurdhi.service;
      } else {
        return charges.current.units_76.samurdhi.service;
      }

    } else if (category == 2) {
      if (units <= 5) {
        return charges.current.units_00_05.wathu.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.current.units_06_10.wathu.service;
      } else if ((units > 10) && units <= 15) {
        return charges.current.units_11_15.wathu.service;
      } else if ((units > 15) && units <= 20) {
        return charges.current.units_16_20.wathu.service;
      } else if ((units > 20) && units <= 25) {
        return charges.current.units_21_25.wathu.service;
      } else if ((units > 25) && units <= 30) {
        return charges.current.units_26_30.wathu.service;
      } else if ((units > 30) && units <= 40) {
        return charges.current.units_31_40.wathu.service;
      } else if ((units > 40) && units <= 50) {
        return charges.current.units_41_50.wathu.service;
      } else if ((units > 50) && units <= 75) {
        return charges.current.units_51_75.wathu.service;
      } else {
        return charges.current.units_76.wathu.service;
      }
    } else {
      if (units <= 5) {
        return charges.current.units_00_05.normal.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.current.units_06_10.normal.service;
      } else if ((units > 10) && units <= 15) {
        return charges.current.units_11_15.normal.service;
      } else if ((units > 15) && units <= 20) {
        return charges.current.units_16_20.normal.service;
      } else if ((units > 20) && units <= 25) {
        return charges.current.units_21_25.normal.service;
      } else if ((units > 25) && units <= 30) {
        return charges.current.units_26_30.normal.service;
      } else if ((units > 30) && units <= 40) {
        return charges.current.units_31_40.normal.service;
      } else if ((units > 40) && units <= 50) {
        return charges.current.units_41_50.normal.service;
      } else if ((units > 50) && units <= 75) {
        return charges.current.units_51_75.normal.service;
      } else {
        return charges.current.units_76.normal.service;
      }
    }
  } else if (setting == "new") {
    if (category == 1) {
      if (units <= 5) {
        return charges.new.units_00_05.samurdhi.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.new.units_06_10.samurdhi.service;
      } else if ((units > 10) && units <= 15) {
        return charges.new.units_11_15.samurdhi.service;
      } else if ((units > 15) && units <= 20) {
        return charges.new.units_16_20.samurdhi.service;
      } else if ((units > 20) && units <= 25) {
        return charges.new.units_21_25.samurdhi.service;
      } else if ((units > 25) && units <= 30) {
        return charges.new.units_26_30.samurdhi.service;
      } else if ((units > 30) && units <= 40) {
        return charges.new.units_31_40.samurdhi.service;
      } else if ((units > 40) && units <= 50) {
        return charges.new.units_41_50.samurdhi.service;
      } else if ((units > 50) && units <= 75) {
        return charges.new.units_51_75.samurdhi.service;
      } else {
        return charges.new.units_76.samurdhi.service;
      }

    } else if (category == 2) {
      if (units <= 5) {
        return charges.new.units_00_05.wathu.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.new.units_06_10.wathu.service;
      } else if ((units > 10) && units <= 15) {
        return charges.new.units_11_15.wathu.service;
      } else if ((units > 15) && units <= 20) {
        return charges.new.units_16_20.wathu.service;
      } else if ((units > 20) && units <= 25) {
        return charges.new.units_21_25.wathu.service;
      } else if ((units > 25) && units <= 30) {
        return charges.new.units_26_30.wathu.service;
      } else if ((units > 30) && units <= 40) {
        return charges.new.units_31_40.wathu.service;
      } else if ((units > 40) && units <= 50) {
        return charges.new.units_41_50.wathu.service;
      } else if ((units > 50) && units <= 75) {
        return charges.new.units_51_75.wathu.service;
      } else {
        return charges.new.units_76.wathu.service;
      }
    } else {
      if (units <= 5) {
        return charges.new.units_00_05.normal.service;
      } else if ((units > 5) && (units <= 10)) {
        return charges.new.units_06_10.normal.service;
      } else if ((units > 10) && units <= 15) {
        return charges.new.units_11_15.normal.service;
      } else if ((units > 15) && units <= 20) {
        return charges.new.units_16_20.normal.service;
      } else if ((units > 20) && units <= 25) {
        return charges.new.units_21_25.normal.service;
      } else if ((units > 25) && units <= 30) {
        return charges.new.units_26_30.normal.service;
      } else if ((units > 30) && units <= 40) {
        return charges.new.units_31_40.normal.service;
      } else if ((units > 40) && units <= 50) {
        return charges.new.units_41_50.normal.service;
      } else if ((units > 50) && units <= 75) {
        return charges.new.units_51_75.normal.service;
      } else {
        return charges.new.units_76.normal.service;
      }
    }
  }
}

function calculateWaterBillUnitCharge(units, category, setting) {

  if (category == 1) {
    if (units <= 5) {
      return charges.previous.units_00_05.samurdhi.unit * units;
    } else if ((units > 5) && (units <= 10)) {
      return (calculateWaterBillUnitCharge(5, category, setting) + charges.previous.units_06_10.samurdhi.unit * (units - 5));
    } else if ((units > 10) && units <= 15) {
      return (calculateWaterBillUnitCharge(10, category, setting) + charges.previous.units_11_15.samurdhi.unit * (units - 10));
    } else if ((units > 15) && units <= 20) {
      return (calculateWaterBillUnitCharge(15, category, setting) + charges.previous.units_16_20.samurdhi.unit * (units - 15));
    } else if ((units > 20) && units <= 25) {
      return (calculateWaterBillUnitCharge(20, category, setting) + charges.previous.units_21_25.samurdhi.unit * (units - 20));
    } else if ((units > 25) && units <= 30) {
      return (calculateWaterBillUnitCharge(25, category, setting) + charges.previous.units_26_30.samurdhi.unit * (units - 25));
    } else if ((units > 30) && units <= 40) {
      return (calculateWaterBillUnitCharge(30, category, setting) + charges.previous.units_31_40.samurdhi.unit * (units - 30));
    } else if ((units > 40) && units <= 50) {
      return (calculateWaterBillUnitCharge(40, category, setting) + charges.previous.units_41_50.samurdhi.unit * (units - 40));
    } else if ((units > 50) && units <= 75) {
      return (calculateWaterBillUnitCharge(50, category, setting) + charges.previous.units_51_75.samurdhi.unit * (units - 50));
    } else {
      return (calculateWaterBillUnitCharge(75, category, setting) + charges.previous.units_76.samurdhi.unit * (units - 75));
    }
  }

  if (category == 2) {
    if (units <= 5) {
      return charges.previous.units_00_05.wathu.unit * units;
    } else if ((units > 5) && (units <= 10)) {
      return (calculateWaterBillUnitCharge(5, category, setting) + charges.previous.units_06_10.wathu.unit * (units - 5));
    } else if ((units > 10) && units <= 15) {
      return (calculateWaterBillUnitCharge(10, category, setting) + charges.previous.units_11_15.wathu.unit * (units - 10));
    } else if ((units > 15) && units <= 20) {
      return (calculateWaterBillUnitCharge(15, category, setting) + charges.previous.units_16_20.wathu.unit * (units - 15));
    } else if ((units > 20) && units <= 25) {
      return (calculateWaterBillUnitCharge(20, category, setting) + charges.previous.units_21_25.wathu.unit * (units - 20));
    } else if ((units > 25) && units <= 30) {
      return (calculateWaterBillUnitCharge(25, category, setting) + charges.previous.units_26_30.wathu.unit * (units - 25));
    } else if ((units > 30) && units <= 40) {
      return (calculateWaterBillUnitCharge(30, category, setting) + charges.previous.units_31_40.wathu.unit * (units - 30));
    } else if ((units > 40) && units <= 50) {
      return (calculateWaterBillUnitCharge(40, category, setting) + charges.previous.units_41_50.wathu.unit * (units - 40));
    } else if ((units > 50) && units <= 75) {
      return (calculateWaterBillUnitCharge(50, category, setting) + charges.previous.units_51_75.wathu.unit * (units - 50));
    } else {
      return (calculateWaterBillUnitCharge(75, category, setting) + charges.previous.units_76.wathu.unit * (units - 75));
    }
  }

  if (category == 3) {
    if (units <= 5) {
      return charges.previous.units_00_05.normal.unit * units;
    } else if ((units > 5) && (units <= 10)) {
      return (calculateWaterBillUnitCharge(5, category, setting) + charges.previous.units_06_10.normal.unit * (units - 5));
    } else if ((units > 10) && units <= 15) {
      return (calculateWaterBillUnitCharge(10, category, setting) + charges.previous.units_11_15.normal.unit * (units - 10));
    } else if ((units > 15) && units <= 20) {
      return (calculateWaterBillUnitCharge(15, category, setting) + charges.previous.units_16_20.normal.unit * (units - 15));
    } else if ((units > 20) && units <= 25) {
      return (calculateWaterBillUnitCharge(20, category, setting) + charges.previous.units_21_25.normal.unit * (units - 20));
    } else if ((units > 25) && units <= 30) {
      return (calculateWaterBillUnitCharge(25, category, setting) + charges.previous.units_26_30.normal.unit * (units - 25));
    } else if ((units > 30) && units <= 40) {
      return (calculateWaterBillUnitCharge(30, category, setting) + charges.previous.units_31_40.normal.unit * (units - 30));
    } else if ((units > 40) && units <= 50) {
      return (calculateWaterBillUnitCharge(40, category, setting) + charges.previous.units_41_50.normal.unit * (units - 40));
    } else if ((units > 50) && units <= 75) {
      return (calculateWaterBillUnitCharge(50, category, setting) + charges.previous.units_51_75.normal.unit * (units - 50));
    } else {
      return (calculateWaterBillUnitCharge(75, category, setting) + charges.previous.units_76.normal.unit * (units - 75));
    }
  }
}

function calculateWaterBill() {

  const category = selectedTab.value + 1;
  console.log(selectedTab.value)
  const numberOfUnits = enteredNumberOfUnits.value;

  //this must be used later
  const averageMonthlyConsumption = numberOfUnits;

  applicableFixedCharge.previous = calculateWaterBillFixedCharge(category, numberOfUnits, "previous");
  applicableFixedCharge.current = calculateWaterBillFixedCharge(category, numberOfUnits, "current");
  applicableFixedCharge.new = calculateWaterBillFixedCharge(category, numberOfUnits, "new");

  applicableUnitCharge.previous = calculateWaterBillUnitCharge(numberOfUnits, category, "previous");
  applicableUnitCharge.current = calculateWaterBillUnitCharge(numberOfUnits, category, "current");
  applicableUnitCharge.new = calculateWaterBillUnitCharge(numberOfUnits, category, "new");


  totalsBeforeTaxes.previous = applicableUnitCharge.previous + applicableFixedCharge.previous;
  totalsBeforeTaxes.current = applicableUnitCharge.current + applicableFixedCharge.current;
  totalsBeforeTaxes.new = applicableUnitCharge.new + applicableFixedCharge.new;

  applicableTax.previous = totalsBeforeTaxes.previous * 15 / 100
  applicableTax.current = totalsBeforeTaxes.current * 15 / 100
  applicableTax.new = totalsBeforeTaxes.new * 15 / 100

  totals.previous = totalsBeforeTaxes.previous + applicableTax.previous;
  totals.current = totalsBeforeTaxes.current + applicableTax.current;
  totals.new = totalsBeforeTaxes.new + applicableTax.new;

  presentageInc.previous = (((totals.new + totals.new * 2.5 / 97.5) - (totals.current + totals.current * 2.5 / 97.5)) * 100 / (totals.current + totals.current * 2.5 / 97.5)).toFixed(0);
  presentageInc.now = (((totals.new + totals.new * 2.5 / 97.5) - totals.previous) * 100 / totals.previous).toFixed(0);

}


</script>
