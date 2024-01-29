import { Profile } from '@/utils/supabase/types';
import React from 'react';
import MemberCard from '../MemberCard';

type Props = {
  members: Profile[];
};

const MemberList = ({ members }: Props) => {
  return (
    <div>
      {members.map(member => (
        <div className="mt-3">
          <MemberCard user={member} />
        </div>
      ))}
    </div>
  );
};

export default MemberList;
