import React from 'react';

const Profilepdf = () => {
  return (
    <div className="container my-5" id="profile-to-print">
      <h2 className="text-center mb-4">পূর্ণ প্রোফাইল</h2>

      <div className="row mb-3">
        <div className="col-md-6">
          <strong>নাম:</strong> মোঃ মোস্তফা কামাল মজুমদার <br />
          <strong>পদ:</strong> অতিরিক্ত সচিব <br />
          <strong>আইডি:</strong> ৬০৪৩ <br />
          <strong>মোবাইল:</strong> +৮৮০১৭১২১৮৯৫৬৭ <br />
          <strong>ইমেইল:</strong> mkmazumder1@gmail.com <br />
          <strong>এনআইডি:</strong> ১৯৬৫১৩১৫৮৫৫৬১৭২৯১ <br />
        </div>
        <div className="col-md-6">
          <strong>জন্ম তারিখ:</strong> ১৫.০৬.১৯৬৫ <br />
          <strong>ধর্ম:</strong> ইসলাম <br />
          <strong>লিঙ্গ:</strong> পুরুষ <br />
          <strong>রক্তের গ্রুপ:</strong> বি-পজিটিভ <br />
          <strong>বৈবাহিক অবস্থা:</strong> বিবাহিত <br />
          <strong>নিজ জেলা:</strong> চাঁদপুর <br />
        </div>
      </div>

      <h5 className="mt-4">স্থায়ী ঠিকানা</h5>
      <p>
        গ্রাম: কাদলা, থানা: কচুয়া, উপজেলা: কচুয়া, পোস্ট অফিস: কাদলা, চাঁদপুর - ৩৬৩০
      </p>

      <h5 className="mt-4">বর্তমান ঠিকানা</h5>
      <p>
        বাড়ি নং: ১১৫, গ্রাম: শান্তিনগর, ১৩ নম্বর ওয়ার্ড, থানা: পল্টন,
        পোস্ট অফিস: শান্তিনগর, ঢাকা - ১২১৭
      </p>

      <h5 className="mt-4">কর্মজীবন</h5>
      <ul>
        <li>সহকারী সচিব - ২৫.০৪.১৯৯৪</li>
        <li>সিনিয়র সহকারী সচিব - ০৩.০৬.২০০৩</li>
        <li>উপসচিব - ০৮.০২.২০১২</li>
        <li>যুগ্মসচিব - ২০.০৯.২০১৮</li>
        <li>অতিরিক্ত সচিব - ০৬.০৪.২০২২</li>
      </ul>

      <button className="btn btn-primary mt-4" onClick={() => window.print()}>
        প্রিন্ট করুন
      </button>
    </div>
  );
};

export default Profilepdf;
