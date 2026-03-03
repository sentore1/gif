"use client";

import { contactFormAction } from "@/app/actions";
import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-navy text-white py-3 rounded-lg font-medium hover:bg-navy/90 transition-colors disabled:opacity-50"
    >
      {pending ? "Sending..." : "Send Message"}
    </button>
  );
}

export default function ContactForm() {
  return (
    <form action={contactFormAction} className="space-y-4">
      <div>
        <label className="block text-navy font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 border border-navy/20 rounded-lg focus:outline-none focus:border-navy"
        />
      </div>
      <div>
        <label className="block text-navy font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 border border-navy/20 rounded-lg focus:outline-none focus:border-navy"
        />
      </div>
      <div>
        <label className="block text-navy font-medium mb-2">Subject</label>
        <input
          type="text"
          name="subject"
          required
          className="w-full px-4 py-2 border border-navy/20 rounded-lg focus:outline-none focus:border-navy"
        />
      </div>
      <div>
        <label className="block text-navy font-medium mb-2">Message</label>
        <textarea
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2 border border-navy/20 rounded-lg focus:outline-none focus:border-navy"
        ></textarea>
      </div>
      <SubmitButton />
    </form>
  );
}
