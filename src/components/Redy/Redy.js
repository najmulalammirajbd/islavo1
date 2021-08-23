import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, Redirect } from 'react-router-dom';
import { UserContext } from '../../App';
import Swal from 'sweetalert2';

const Redy = () => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = (data) => {
    fetch('https://islavo.web.app/api/users/createPaymentLink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.paymentLink) {
          window.location.href = `${data.paymentLink}`;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'সফলভাবে ফরম পূরণ হয়েছে',
            showConfirmButton: false,
            timer: 2000,
          });
          history.push('/clicknow');
        }
      });
  };

  console.log(watch('example')); // watch input value by passing the name of it
  return (
    <div className='loginform'>
      <h2 className='text4'>
        যেভাবে পেমেন্ট করতে পারবেনঃ <br />
        বিকাশ ও নগদ , ভিসা , মাস্টার ও এমেরিকান এক্সপ্রেস । <br />
        পেমেন্ট করে অ্যাপে পূনরায় লগ-ইন করুন । <br />
      </h2>
      <h1 className='text2'>চার্জ ৬৪.২ টাকা মাত্র (মেয়াদ ১বছর)</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={loggedInUser.email}
          {...register('email', { required: true })}
          placeholder=' আপনার ইমেইল'
        />{' '}
        <br />
        <input
          {...register('name', { required: true })}
          placeholder=' আপনার নাম'
        />{' '}
        <br />
        <input
          {...register('phone', { required: true })}
          placeholder=' আপনার মোবাইল'
        />{' '}
        <br />
        <input
          {...register('payment', { required: true })}
          value='paid'
          style={{ display: 'none' }}
        />
        <button type='submit'>টাকা পরিশোধ করুন</button>
      </form>
    </div>
  );
};

export default Redy;
