// components/PrivacyPolicy.js
export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-4xl mx-auto text-left">
      <h1 className="text-center text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">Last updated August 07, 2024</p>

      <p className="mb-4">
        This privacy notice for Friend Ferry ltd (&apos;we&apos;,
        &apos;us&apos;, or &apos;our&apos;), describes how and why we might
        collect, store, use, and/or share (&apos;process&apos;) your information
        when you use our services (&apos;Services&apos;), such as when you:
      </p>

      <ul className="list-disc pl-5 mb-4">
        <li>
          Visit our website at{" "}
          <a
            href="https://friendferry.com/"
            className="text-blue-600 hover:underline"
          >
            https://friendferry.com/
          </a>
          , or any website of ours that links to this privacy notice
        </li>
        <li>
          Engage with us in other related ways, including any sales, marketing,
          or events
        </li>
      </ul>

      <p className="mb-4">
        Questions or concerns? Reading this privacy notice will help you
        understand your privacy rights and choices. If you do not agree with our
        policies and practices, please do not use our Services. If you still
        have any questions or concerns, please contact us at{" "}
        <a
          href="mailto:admin@friendferry.com"
          className="text-blue-600 hover:underline"
        >
          admin@friendferry.com
        </a>
        .
      </p>

      <h2 className="text-2xl font-bold mt-6 mb-4">SUMMARY OF KEY POINTS</h2>

      <p className="mb-4">
        This summary provides key points from our privacy notice, but you can
        find out more details about any of these topics by clicking the link
        following each key point or by using our table of contents below to find
        the section you are looking for.
      </p>

      <ul className="list-disc pl-5">
        <li>
          <strong>What personal information do we process?</strong> When you
          visit, use, or navigate our Services, we may process personal
          information depending on how you interact with us and the Services,
          the choices you make, and the products and features you use.{" "}
        </li>
        <li>
          <strong>Do we process any sensitive personal information?</strong> We
          do not process sensitive personal information.
        </li>
        <li>
          <strong>Do we collect any information from third parties?</strong> We
          do not collect any information from third parties.
        </li>
        <li>
          <strong>How do we process your information?</strong> We process your
          information to provide, improve, and administer our Services,
          communicate with you, for security and fraud prevention, and to comply
          with law. We may also process your information for other purposes with
          your consent. We process your information only when we have a valid
          legal reason to do so.{" "}
        </li>
      </ul>
      <div className="p-6 max-w-4xl mx-auto text-left">
        <h2 className="text-2xl font-bold mt-6 mb-4">
          In what situations and with which parties do we share personal
          information?
        </h2>
        <p className="mb-4">
          We may share information in specific situations and with specific
          third parties. Learn more about{" "}
          <a href="#" className="text-blue-600 hover:underline">
            when and with whom we share your personal information
          </a>
          .
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">
          How do we keep your information safe?
        </h2>
        <p className="mb-4">
          We have organisational and technical processes and procedures in place
          to protect your personal information. However, no electronic
          transmission over the internet or information storage technology can
          be guaranteed to be 100% secure, so we cannot promise or guarantee
          that hackers, cybercriminals, or other unauthorised third parties will
          not be able to defeat our security and improperly collect, access,
          steal, or modify your information. .
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">What are your rights?</h2>
        <p className="mb-4">
          Depending on where you are located geographically, the applicable
          privacy law may mean you have certain rights regarding your personal
          information. .
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-4">
          How do you exercise your rights?
        </h2>
        <p className="mb-4">
          The easiest way to exercise your rights is by submitting data subject
          access request is by contacting us at Friend Ferry ltd. We will
          consider and act upon any request in accordance with applicable data
          protection laws.
        </p>
      </div>
      <div className="p-6 max-w-4xl mx-auto text-left">
        <h2 className="text-2xl font-bold mt-6 mb-4">
          1. WHAT INFORMATION DO WE COLLECT?
        </h2>

        <h3 className="text-xl font-bold mt-4 mb-2">
          Personal information you disclose to us
        </h3>

        <p className="italic mb-4">
          <strong>In Short:</strong> We collect personal information that you
          provide to us.
        </p>

        <p className="mb-4">
          We collect personal information that you voluntarily provide to us
          when you register on the Services, express an interest in obtaining
          information about us or our products and Services, when you
          participate in activities on the Services, or otherwise when you
          contact us.
        </p>

        <p className="mb-4">
          <strong>Personal Information Provided by You.</strong> The personal
          information that we collect depends on the context of your
          interactions with us and the Services, the choices you make, and the
          products and features you use. The personal information we collect may
          include the following:
        </p>

        <ul className="list-disc pl-5 mb-4">
          <li>names</li>
          <li>email addresses</li>
          <li>usernames</li>
          <li>passwords</li>
        </ul>

        <p className="mb-4">
          <strong>Sensitive Information.</strong> We do not process sensitive
          information.
        </p>

        <p className="mb-4">
          <strong>Payment Data.</strong> We may collect data necessary to
          process your payment if you choose to make purchases, such as your
          payment instrument number, and the security code associated with your
          payment instrument. All payment data is handled and stored by Stripe.
          You may find their privacy notice link(s) here:{" "}
          <a
            href="https://stripe.com/gb/privacy"
            className="text-blue-600 hover:underline"
          >
            https://stripe.com/gb/privacy
          </a>
          .
        </p>

        <p className="mb-4">
          All personal information that you provide to us must be true,
          complete, and accurate, and you must notify us of any changes to such
          personal information.
        </p>
      </div>
    </div>
  );
}
