import axiosInstance from '@/lib/axios'; 
import CredentialsProvider from "next-auth/providers/credentials";

export const Register = async (name,phone,email, password) => {
  try { 
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { fullName:name,phoneNumber:phone,email, password });
    const { user } = response.data;  
    return { success: true, user };
  } catch (error) { 
    return { success: false, error:error.response.data || error.message };
  }
}

export const ForgotPassword = async (email) => { 
  try { 
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`, { email });
    return { success: true, response };
  } catch (error) { 
    return { success: false, error:error.response.data || error.message };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axiosInstance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );

          if (response.status === 200 && response.data.status === "success") {
            const { token, user } = response.data.data;

            return {
              id: user._id,
              name: user.fullName,
              email: user.email,
              phone: user.phoneNumber,
              status: user.status,
              rejectionReason: user.rejectionReason,
              isProfilePublished: user.isProfilePublished,
              deletedAt: user.deletedAt,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              role: user.role, 
              token,
            };
          } else {
            throw new Error(response.data.message || "Invalid credentials");
          }
        } catch (error) {
          console.error("Login error:", error.message);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.phone = user.phone;
        token.status = user.status;
        token.rejectionReason = user.rejectionReason;
        token.isProfilePublished = user.isProfilePublished;
        token.deletedAt = user.deletedAt;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt; 
        token.backendToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        phone: token.phone,
        status: token.status,
        rejectionReason: token.rejectionReason,
        isProfilePublished: token.isProfilePublished,
        deletedAt: token.deletedAt,
        createdAt: token.createdAt,
        updatedAt: token.updatedAt,
      };
      session.token = token.backendToken;  
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

 