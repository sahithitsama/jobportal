import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: '',
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = e => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) formData.append('file', input.file);

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, []);

  return (
    <div className="bg-[#f4f1ea] min-h-screen font-sans">
      <Navbar />
      <div className="flex justify-center items-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-[90%] md:w-[70%] lg:w-[45%] bg-[#e1e6d5] border border-[#d1d5db] rounded-2xl shadow-lg p-10 my-10"
        >
          <h1 className="font-bold text-3xl mb-8 text-center text-[#1e1e1e]">
            Sign Up
          </h1>

          {/* Full Name */}
          <div className="mb-5">
            <Label className="text-[#2d2d2d]">Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <Label className="text-[#2d2d2d]">Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="you@example.com"
            />
          </div>

          {/* Phone */}
          <div className="mb-5">
            <Label className="text-[#2d2d2d]">Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Enter your phone number"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <Label className="text-[#2d2d2d]">Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Minimum 6 characters"
            />
          </div>

          {/* Role and Profile Image */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-6">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                <Label className="text-[#2d2d2d]">Student</Label>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                <Label className="text-[#2d2d2d]">Recruiter</Label>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Label className="text-[#2d2d2d]">Profile</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button disabled className="w-full mt-8 bg-[#7a9c4f] text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing you up...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full mt-8 bg-[#7a9c4f] hover:bg-[#65843f] text-white transition-colors duration-200"
            >
              Sign Up
            </Button>
          )}

          {/* Redirect */}
          <p className="text-sm text-center mt-6 text-[#2d2d2d]">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
