<script>
import UserSearchForm from '@/components/UserSearchForm';
import UserProfile from '@/components/UserProfile';

export default {
  name: 'UserView',
  components: {
    UserSearchForm,
    UserProfile,
  }
};
</script>

<template>
  <div>
    <UserSearchForm />
    <UserProfile />
  </div>
</template>