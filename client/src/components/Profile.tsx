import React from "react";
import * as Avatar from "@radix-ui/react-avatar";
import { Settings, Mail, Phone, MapPin, Calendar } from "lucide-react";

interface ProfileProps {
  user: {
    name: string;
    role: string;
    avatar: string;
    email?: string;
    phone?: string;
    location?: string;
    joinDate?: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#E84C3D] to-[#f06e63] h-32" />
      <div className="px-6 pb-6">
        <div className="relative -mt-16 mb-6 flex justify-center">
          <Avatar.Root className="relative inline-flex h-32 w-32 select-none items-center justify-center overflow-hidden rounded-full bg-white p-1">
            <Avatar.Image
              className="h-full w-full rounded-full object-cover"
              src={user.avatar}
              alt={user.name}
            />
            <Avatar.Fallback
              className="flex h-full w-full items-center justify-center bg-gray-100 text-2xl font-medium uppercase text-gray-600"
              delayMs={600}
            >
              {user.name.slice(0, 2)}
            </Avatar.Fallback>
          </Avatar.Root>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600 mt-1">{user.role}</p>
        </div>

        <div className="space-y-4">
          {user.email && (
            <div className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-3" />
              <span>{user.email}</span>
            </div>
          )}
          {user.phone && (
            <div className="flex items-center text-gray-600">
              <Phone className="h-5 w-5 mr-3" />
              <span>{user.phone}</span>
            </div>
          )}
          {user.location && (
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-3" />
              <span>{user.location}</span>
            </div>
          )}
          {user.joinDate && (
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-3" />
              <span>Joined {user.joinDate}</span>
            </div>
          )}
        </div>

        <div className="mt-8">
          <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
