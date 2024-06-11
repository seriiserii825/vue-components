<script setup>
import CallIcon from "../../icons/CallIcon.vue";
import EmailIcon from "../../icons/EmailIcon.vue";
import AddressIcon from "../../icons/AddressIcon.vue";
import {computed} from "@vue/runtime-core";
import {useClearPhone} from "../../hooks/useClearPhone";
import {onMounted} from "vue";

const props = defineProps({
  contact_name: {
    type: String,
    required: false
  },
  contact_phone: {
    type: String,
    required: false
  },
  contact_email: {
    type: String,
    required: false
  },
  contact_note: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: false
  },
  address_name: {
    type: String,
    required: false
  },
  address_postal_code: {
    type: String,
    required: false
  },
  address_location: {
    type: String,
    required: false
  },
  address_city: {
    type: String,
    required: false
  },
  address_province: {
    type: String,
    required: false
  },
  address_note: {
    type: String,
    required: false
  },
});

const address_str = computed(() => {
  return props.address + ' ' + props.address_postal_code + ' ' + props.address_location + ' ' + props.address_city +
      ' - (' + props.address_province + ')';
});

const clear_tel = computed(() => {
  return useClearPhone(props.contact_phone);
});
</script>
<template>
  <div class='contacts-list'>
    <div class='contacts-list__item'>
      <h3 class="contacts-list__title">{{ contact_name }}</h3>
      <ul>
        <li v-if="contact_phone">
          <div class="contacts-list__icon">
            <CallIcon/>
          </div>
          <a target="_blank" :href="`tel:${clear_tel}`">{{ contact_phone }}</a>
        </li>
        <li v-if="contact_email">
          <div class="contacts-list__icon">
            <EmailIcon/>
          </div>
          <a target="_blank" :href="`mailto:${contact_email}`">{{ contact_email }}</a>
        </li>
      </ul>
      <p v-if="contact_note" class="contacts-list__info">{{ contact_note }}</p>
    </div>
    <div class='contacts-list__item'>
      <h3 class="contacts-list__title" v-if="address_name">{{ address_name }}</h3>
      <ul>
        <li v-if="address_str">
          <div class="contacts-list__icon">
            <AddressIcon color="#65B244"/>
          </div>
          <span>{{ address_str }}</span>
        </li>
      </ul>
      <p v-if="address_note" class="contacts-list__info">{{ address_note }}</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.contacts-list {
  &__title {
    margin-bottom: 0.4rem;
    font-size: 1.6rem;
    font-weight: 600;
  }
  &__item {
    padding-bottom: 3.2rem;
    &:first-of-type {
      margin-bottom: 3.2rem;
      border-bottom: 1px solid #D1F4EE;
    }
  }
  li {
    display: flex;
    align-items: center;
    a {
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__icon {
    display: inline-block;
    margin-right: 1rem;
  }
  &__info {
    position: relative;
    margin-left: 4.2rem;
    padding-left: 1.2rem;
    font-size: 1.2rem;
    font-weight: 500;
    font-style: italic;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      background: #FF5A5A;
    }
  }
}
</style>