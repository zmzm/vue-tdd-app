<script>
import UserSearchForm from '@/components/UserSearchForm';
import UserProfile from '@/components/UserProfile';

export default {
  name: 'UserView',
  components: {
    UserSearchForm,
    UserProfile,
  },
  data() {
    return {
      user: { name: '' },
    };
  },
};
</script>

<template>
  <div>
    <UserSearchForm />
    <UserProfile :user="user" />
  </div>
</template>
