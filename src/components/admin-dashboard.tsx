"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../supabase/client";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  Download,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

interface Application {
  id: string;
  first_name: string;
  surname: string;
  middle_name: string | null;
  date_of_birth: string;
  id_number: string;
  education_level: string;
  specialization: string;
  program: string;
  duration: string;
  reason_to_apply: string;
  application_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

const programNames: Record<string, string> = {
  afa: "Acting for Film and Theater Program",
  career: "Career Guidance & Internship",
  film: "Film Making & TV Production",
  animation: "Animation & Motion Graphics",
  photography: "Photography & Graphic Design",
};

const durationNames: Record<string, string> = {
  three_months: "Three Months",
  six_months: "Six Months",
};

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [programFilter, setProgramFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchApplications();

    const channel = supabase
      .channel("applications-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "applications" },
        () => {
          fetchApplications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    filterApplications();
  }, [applications, searchQuery, statusFilter, programFilter]);

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = [...applications];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (app) =>
          app.first_name.toLowerCase().includes(query) ||
          app.surname.toLowerCase().includes(query) ||
          app.id_number.includes(query)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (programFilter !== "all") {
      filtered = filtered.filter((app) => app.program === programFilter);
    }

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      fetchApplications();
    } catch (error) {
      console.error("Error updating application:", error);
    } finally {
      setUpdating(null);
    }
  };

  const bulkUpdateStatus = async (status: string) => {
    if (selectedIds.length === 0) return;

    setUpdating("bulk");
    try {
      const { error } = await supabase
        .from("applications")
        .update({ status, updated_at: new Date().toISOString() })
        .in("id", selectedIds);

      if (error) throw error;
      setSelectedIds([]);
      fetchApplications();
    } catch (error) {
      console.error("Error bulk updating applications:", error);
    } finally {
      setUpdating(null);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "First Name",
      "Surname",
      "Middle Name",
      "Date of Birth",
      "ID Number",
      "Education Level",
      "Specialization",
      "Program",
      "Duration",
      "Reason to Apply",
      "Application Date",
      "Status",
    ];

    const rows = filteredApplications.map((app) => [
      app.id.slice(0, 8).toUpperCase(),
      app.first_name,
      app.surname,
      app.middle_name || "",
      app.date_of_birth,
      app.id_number,
      app.education_level,
      app.specialization,
      programNames[app.program] || app.program,
      durationNames[app.duration] || app.duration,
      `"${app.reason_to_apply.replace(/"/g, '""')}"`,
      app.application_date,
      app.status,
    ]);

    const csv = [headers.join(","), ...rows.map((row) => row.join(","))].join(
      "\n"
    );

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applications-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredApplications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredApplications.map((app) => app.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
    acceptanceRate:
      applications.length > 0
        ? Math.round(
            (applications.filter((a) => a.status === "approved").length /
              applications.filter((a) => a.status !== "pending").length) *
              100
          ) || 0
        : 0,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            Pending
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#E4E7EB]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5F6B7A]">Total Applications</p>
              <p className="text-3xl font-bold text-navy mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-navy" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#E4E7EB]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5F6B7A]">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {stats.pending}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#E4E7EB]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5F6B7A]">Approved</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {stats.approved}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-sm border border-[#E4E7EB]"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5F6B7A]">Acceptance Rate</p>
              <p className="text-3xl font-bold text-navy mt-1">
                {stats.acceptanceRate}%
              </p>
            </div>
            <div className="w-12 h-12 bg-navy/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-navy" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-[#E4E7EB]">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F6B7A]" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={programFilter} onValueChange={setProgramFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Program" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                {Object.entries(programNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 w-full lg:w-auto">
            {selectedIds.length > 0 && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => bulkUpdateStatus("approved")}
                  disabled={updating === "bulk"}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Approve ({selectedIds.length})
                </Button>
                <Button
                  size="sm"
                  onClick={() => bulkUpdateStatus("rejected")}
                  disabled={updating === "bulk"}
                  variant="destructive"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject ({selectedIds.length})
                </Button>
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={exportToCSV}
              className="border-navy text-navy"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E4E7EB] overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FAFBFC]">
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      filteredApplications.length > 0 &&
                      selectedIds.length === filteredApplications.length
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>Application ID</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-[#5F6B7A]"
                  >
                    No applications found
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow
                    key={app.id}
                    className="hover:bg-[#FAFBFC] cursor-pointer group"
                    onClick={() => {
                      setSelectedApplication(app);
                      setIsSheetOpen(true);
                    }}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedIds.includes(app.id)}
                        onCheckedChange={() => toggleSelectOne(app.id)}
                      />
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {app.id.slice(0, 8).toUpperCase()}
                    </TableCell>
                    <TableCell className="font-medium">
                      {app.first_name} {app.surname}
                    </TableCell>
                    <TableCell>{programNames[app.program] || app.program}</TableCell>
                    <TableCell>
                      {durationNames[app.duration] || app.duration}
                    </TableCell>
                    <TableCell>
                      {new Date(app.application_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={app.status}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        >
                          {getStatusBadge(app.status)}
                        </motion.div>
                      </AnimatePresence>
                    </TableCell>
                    <TableCell className="text-right">
                      <div
                        className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedApplication(app);
                            setIsSheetOpen(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {app.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                updateApplicationStatus(app.id, "approved")
                              }
                              disabled={updating === app.id}
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            >
                              {updating === app.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                updateApplicationStatus(app.id, "rejected")
                              }
                              disabled={updating === app.id}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              {updating === app.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Application Detail Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          {selectedApplication && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  <span>Application Details</span>
                  {getStatusBadge(selectedApplication.status)}
                </SheetTitle>
                <SheetDescription>
                  Reference: {selectedApplication.id.slice(0, 8).toUpperCase()}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-8 space-y-8">
                {/* Personal Information */}
                <div>
                  <h3 className="font-semibold text-navy mb-4 text-lg">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#5F6B7A]">Full Name</p>
                      <p className="font-medium">
                        {selectedApplication.first_name}{" "}
                        {selectedApplication.middle_name}{" "}
                        {selectedApplication.surname}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5F6B7A]">Date of Birth</p>
                      <p className="font-medium">
                        {new Date(
                          selectedApplication.date_of_birth
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5F6B7A]">ID Number</p>
                      <p className="font-medium">
                        {selectedApplication.id_number}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5F6B7A]">Education Level</p>
                      <p className="font-medium">
                        {selectedApplication.education_level}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-[#5F6B7A]">Specialization</p>
                      <p className="font-medium">
                        {selectedApplication.specialization}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                <div>
                  <h3 className="font-semibold text-navy mb-4 text-lg">
                    Program Selection
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#5F6B7A]">Program</p>
                      <p className="font-medium">
                        {programNames[selectedApplication.program] ||
                          selectedApplication.program}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5F6B7A]">Duration</p>
                      <p className="font-medium">
                        {durationNames[selectedApplication.duration] ||
                          selectedApplication.duration}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Motivation */}
                <div>
                  <h3 className="font-semibold text-navy mb-4 text-lg">
                    Motivation
                  </h3>
                  <div className="bg-[#FAFBFC] rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                      {selectedApplication.reason_to_apply}
                    </p>
                  </div>
                </div>

                {/* Application Meta */}
                <div>
                  <h3 className="font-semibold text-navy mb-4 text-lg">
                    Application Info
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[#5F6B7A]">Application Date</p>
                      <p className="font-medium">
                        {new Date(
                          selectedApplication.application_date
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-[#5F6B7A]">Submitted On</p>
                      <p className="font-medium">
                        {new Date(
                          selectedApplication.created_at
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {selectedApplication.status === "pending" && (
                  <div className="flex gap-4 pt-4 border-t">
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        updateApplicationStatus(
                          selectedApplication.id,
                          "approved"
                        );
                        setIsSheetOpen(false);
                      }}
                      disabled={updating === selectedApplication.id}
                    >
                      {updating === selectedApplication.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => {
                        updateApplicationStatus(
                          selectedApplication.id,
                          "rejected"
                        );
                        setIsSheetOpen(false);
                      }}
                      disabled={updating === selectedApplication.id}
                    >
                      {updating === selectedApplication.id ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <X className="w-4 h-4 mr-2" />
                      )}
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
