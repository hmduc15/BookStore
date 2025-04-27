<template>
  <b-row class="custom-choicejs-plugin">
    <b-col lg="12">
      <b-card no-body>
        <b-card-body>
          <div class="d-flex flex-wrap align-items-center justify-content-between">
            <div class="d-flex flex-wrap align-items-center">
              <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                <h4 class="me-2 h4">Choicejs</h4>
              </div>
            </div>
            <small>For more Information regarding Choicejs Plugin refer
              <a href="https://www.npmjs.com/package/@vueform/multiselect">Documentation</a>
            </small>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
  <b-row class="custom-choicejs-plugin">
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>A Basic</b-card-title>
        </b-card-header>
        <b-card-body class="iq-select2-userAdd  basicChoicejs">
          <b-card-text class="mb-5">In this method, selecting only one option from a lots of options while only using up
            as much
            space
            as a single option excepted.</b-card-text>
          <!-- <select-component v-model="value" :options="options" class="form-control"></select-component> -->
          <select class="select2-basic-single form-control" ref="basicChoise">
            <option selected>1</option>
            <option>2</option>
            <option>3</option>
            <option>4 </option>
          </select>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>Multiple Choice</b-card-title>
        </b-card-header>
        <b-card-body class="iq-select2-userAdd isSelectedChoice multiChoicejs">
          <b-card-text class="mb-5">when the multiple attribute is used with the select element, we can enable the
            selection of
            multiple options from the list.</b-card-text>
          <!-- <select v-model="multivalue" mode="tags" :options="multioptions" class="form-control"
            :close-on-select="false"></select> -->
          <select class="select2-basic-single form-control" ref="multivalue" multiple>
            <option selected>Choise 1</option>
            <option>Choise 2</option>
            <option>Choise 3</option>
            <option>Choise 4 </option>
          </select>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>Text Inputs</b-card-title>
        </b-card-header>
        <b-card-body class="textInputChoicejs">
          <b-card-text class="mb-5">An input element can be displayed in many ways, depending on the type attribute.
            Displays a
            single-line text input field.</b-card-text>
          <select-component v-model="value" class="form-control"></select-component>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>Option Group</b-card-title>
        </b-card-header>
        <b-card-body class="iq-select2-userAdd basicChoicejs">
          <b-card-text class="mb-5">The optgroup tag is used to group related options in a select element (drop-down
            list).</b-card-text>
          <select class="select2-basic-single form-control" ref="OptionGroup"></select>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>Dropdown Items</b-card-title>
        </b-card-header>
        <b-card-body class="iq-select2-userAdd basicChoicejs">
          <b-card-text class="mb-5">A dropdown allows a user to select a value from a series of options. A selection
            dropdown can
            allow
            multiple search selections.</b-card-text>
          <select class="select2-basic-single form-control" ref="dropdownoptions">
            <option selected>Dropdown item 1</option>
            <option>Dropdown item 2</option>
            <option>Dropdown item 3</option>
            <option>Dropdown item 4 </option>
            <option>Dropdown item 5</option>
            <option>Dropdown item 6</option>
            <option>Dropdown item 7</option>
            <option>Dropdown item 8</option>
          </select>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>Items Input</b-card-title>
        </b-card-header>
        <b-card-body class="iq-select2-userAdd isSelectedChoice inputItems">
          <b-card-text class="mb-5">A dropdown allows a user to select a value from a series of options(Limit is 5
            items).</b-card-text>
          <select class="select2-basic-single form-control" ref="ItemsInput" multiple>
            <option>Item 1</option>
            <option>Item 2</option>
            <option>Item 3</option>
            <option>Item 4 </option>
            <option>Item 5</option>
            <option>Item 6</option>
            <option>Item 7</option>
            <option>Item 8</option>
            <option>Item 9</option>
            <option>Item 10</option>
          </select>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>Only Email Address</b-card-title>
        </b-card-header>
        <b-card-body class="iq-select2-userAdd isSelectedChoice multiChoicejs">
          <b-card-text class="mb-5">An email address identifies an email box to which messages are delivered.Only Email
            type content
            is
            available.</b-card-text>
          <select multiple class="select2-basic-single form-control" ref="OnlyMail"></select>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>Email Disable</b-card-title>
        </b-card-header>
        <b-card-body class="iq-select2-userAdd isSelectedChoice multiChoicejs">
          <b-card-text class="mb-5">
            An email address identifies an email box to which messages are delivered. Only Email
            type content is available.
          </b-card-text>
          <select multiple class="select2-basic-single form-control" ref="EmailDisable"></select>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import Choices from 'choices.js';

const value = ref("1")
const max = ref(5)
const EmailOnlyAddress = ref(['joe@bloggs.com'])

const ItemsInput = ref(null);
const dropdownoptions = ref(null);
const OptionGroup = ref(null);
const OnlyMail = ref(null);
const EmailDisable = ref(null);
const basicChoise = ref(null);
const multivalue = ref(null);

onMounted(() => {
  new Choices(basicChoise.value, {
    searchEnabled: false,
    shouldSort: false,
    removeItemButton: true, // Show a remove button on selected items
  });

  new Choices(multivalue.value, {
    searchEnabled: false,
    shouldSort: false,
    addItems: true, // Allow adding multiple items
    removeItems: true, // Enable removing items
    removeItemButton: true, // Show a remove button on selected items
  });

  new Choices(dropdownoptions.value, {
    searchEnabled: true,
    shouldSort: false,
  });

  new Choices(ItemsInput.value, {
    searchEnabled: false,
    shouldSort: false,
    addItems: true,
    removeItems: true,
    removeItemButton: true,
  });

  const Onlymail = new Choices(OnlyMail.value, {
    addItems: false,
    removeItemButton: false,
    searchEnabled: false,
  });
  Onlymail.setValue(['joe@bloggs.com']);

  const choices = new Choices(EmailDisable.value, {
    addItems: false,
    removeItemButton: false,
    searchEnabled: false,
  });
  choices.setValue(['josh@joshuajohnson.co.uk', 'joe@bloggs.co.uk']);
  choices.disable();


  if (OptionGroup.value) {
    const optionGroupChoices = new Choices(OptionGroup.value, {
      searchEnabled: false,
      shouldSort: false,
    });

    optionGroupChoices.setChoices(
      [
        { value: 'One', label: 'France', disabled: true },
        { value: 'Two', label: 'Marseille' },
        { value: 'Three', label: 'Paris' },
        { value: 'Four', label: 'UK', disabled: true },
        { value: 'Five', label: 'London', selected: true },
        { value: 'Six', label: 'Manchester' },
      ],
      'value',
      'label',
      false
    );
  }

});

</script>
