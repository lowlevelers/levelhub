import HomePageHeader from '@/components/ui/HomePageHeader';
import MemberList from '@/components/ui/MemberList';
import { MIDDLE_STYLE } from '@/constants';
import { createBrowserClient } from '@/utils/supabase/browser';
import UsersService from '@/utils/supabase/services/users';

export default async function Members() {
  const browserService = createBrowserClient();
  const usersService = new UsersService(browserService);
  const members = await usersService.getAllUserProfiles();

  return (
    <div style={{ ...MIDDLE_STYLE, width: '100%' }}>
      <MemberList members={members} />
    </div>
  );
}
