"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/ui/file-upload";
import { Plus, Edit, Save, X, Trash2, LogOut } from "lucide-react";
import { useData, useSave } from "@/service/data";
import { Property } from "@prisma/client";

import {
  $Enums,
  AboutData,
  AboutSection,
  ContactInformation,
  CopyrightInformation,
  CtaSection,
  FinalCtaSection,
  HeroSection,
  LogoInformation,
  PropertyPageSection,
  PropertySection,
  RelatedPropertiesSection,
  ServiceData,
  ServicesSection,
  SocialMediaInformation,
  TestimonialData,
  TestimonialSection,
  WhyData,
  WhySection,
} from "@prisma/client";
import { convertToIDR, convertToTitleCase } from "@/helper/formatter";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { MultiFileUpload } from "@/components/ui/multi-file-upload";
import { withAuth } from "@/components/with-auth";
import { useRouter } from "next/navigation";

const AdminPage = () => {
  const { data, isLoading } = useData();

  const router = useRouter();

  // ====== Mutations (create/update) ======
  const mHero = useSave("post", "/admin/hero");
  const mAbout = useSave("post", "/admin/about");
  const mAboutData = useSave("post", "/admin/about-data");
  const mProperty = useSave("post", "/admin/property");
  const mWhy = useSave("post", "/admin/why");
  const mWhyData = useSave("post", "/admin/why-data");
  const mCTA = useSave("post", "/admin/cta");
  const mServices = useSave("post", "/admin/services");
  const mServiceData = useSave("post", "/admin/service-data");
  const mTestimonials = useSave("post", "/admin/testimonials");
  const mTestimonialData = useSave("post", "/admin/testimonial-data");
  const mRelated = useSave("post", "/admin/related");
  const mFinalCTA = useSave("post", "/admin/final-cta");
  const mPropertyPage = useSave("post", "/admin/property-page");
  const mLogo = useSave("post", "/admin/logo");
  const mContact = useSave("post", "/admin/contact");
  const mCopyright = useSave("post", "/admin/copyright");
  const mSocial = useSave("post", "/admin/social");
  const mPropertyItem = useSave("post", "/admin/property-item");

  // ====== Mutations (delete) ======
  const dAboutData = useSave("patch", "/admin/about-data");
  const dWhyData = useSave("patch", "/admin/why-data");
  const dServiceData = useSave("patch", "/admin/service-data");
  const dTestimonialData = useSave("patch", "/admin/testimonial-data");
  const dSocial = useSave("patch", "/admin/social");
  const dPropertyItem = useSave("patch", "/admin/property-item");

  // ====== Edit states per section ======
  const [hero, setHero] = useState<Partial<HeroSection> | null>(null);
  const [about, setAbout] = useState<Partial<AboutSection> | null>(null);
  const [aboutItem, setAboutItem] = useState<Partial<AboutData> | null>(null);

  const [propertySec, setPropertySec] =
    useState<Partial<PropertySection> | null>(null);

  const [why, setWhy] = useState<Partial<WhySection> | null>(null);
  const [whyItem, setWhyItem] = useState<Partial<WhyData> | null>(null);

  const [cta, setCta] = useState<Partial<CtaSection> | null>(null);

  const [services, setServices] = useState<Partial<ServicesSection> | null>(
    null
  );
  const [serviceItem, setServiceItem] = useState<Partial<ServiceData> | null>(
    null
  );

  const [propertyItem, setPropertyItem] = useState<Partial<Property> | null>(
    null
  );

  const [testimonials, setTestimonials] =
    useState<Partial<TestimonialSection> | null>(null);
  const [testimonialItem, setTestimonialItem] =
    useState<Partial<TestimonialData> | null>(null);

  const [related, setRelated] =
    useState<Partial<RelatedPropertiesSection> | null>(null);
  const [finalCta, setFinalCta] = useState<Partial<FinalCtaSection> | null>(
    null
  );
  const [propertyPage, setPropertyPage] =
    useState<Partial<PropertyPageSection> | null>(null);

  const [logo, setLogo] = useState<Partial<LogoInformation> | null>(null);
  const [contact, setContact] = useState<Partial<ContactInformation> | null>(
    null
  );
  const [copyright, setCopyright] =
    useState<Partial<CopyrightInformation> | null>(null);
  const [socialItem, setSocialItem] =
    useState<Partial<SocialMediaInformation> | null>(null);

  if (isLoading || !data) return null;

  /* ---------------------- Render ---------------------- */
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-row justify-between items-center mb-8">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dasbor Admin
            </h1>
            <p className="text-gray-600">
              Kelola seluruh konten di website Anda
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              router.push("/logout");
            }}
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>

        <Tabs defaultValue="home" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="home">Beranda</TabsTrigger>
            <TabsTrigger value="sections">Bagian</TabsTrigger>
            <TabsTrigger value="property-page">Halaman Properti</TabsTrigger>
            <TabsTrigger value="branding">Merek</TabsTrigger>
            <TabsTrigger value="social">Sosial</TabsTrigger>
          </TabsList>

          {/* BERANDA */}
          <TabsContent value="home" className="space-y-6">
            {/* Hero */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian Hero
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setHero(
                        data.hero ?? {
                          title: "",
                          subtitle: "",
                          buttonText: "",
                          image: "",
                        }
                      )
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah Hero
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.hero?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.hero?.subtitle}
                </p>
                <p>
                  <strong>Teks Tombol:</strong> {data.hero?.buttonText}
                </p>
                <p>
                  <strong>Gambar:</strong> {data.hero?.image}
                </p>
              </CardContent>
            </Card>

            {/* Final CTA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  CTA Terakhir
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFinalCta(
                        data.finalCtaSection ?? {
                          title: "",
                          subtitle: "",
                          primaryButtonText: "",
                          secondaryButtonText: "",
                        }
                      )
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah CTA Terakhir
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.finalCtaSection?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.finalCtaSection?.subtitle}
                </p>
                <p>
                  <strong>Tombol Utama:</strong>{" "}
                  {data.finalCtaSection?.primaryButtonText}
                </p>
                <p>
                  <strong>Tombol Sekunder:</strong>{" "}
                  {data.finalCtaSection?.secondaryButtonText}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BAGIAN */}
          <TabsContent value="sections" className="space-y-6">
            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian Tentang
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setAbout(
                          data.about ?? {
                            title: "",
                            subtitle: "",
                            description: "",
                            image: "",
                          }
                        )
                      }
                    >
                      <Edit className="h-4 w-4 mr-2" /> Ubah Tentang
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setAboutItem({
                          aboutId: data.about?.id,
                          label: "",
                          value: "",
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Tambah Statistik
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.about?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.about?.subtitle}
                </p>
                <p>
                  <strong>Deskripsi:</strong> {data.about?.description}
                </p>
                <p>
                  <strong>Gambar:</strong> {data.about?.image}
                </p>
                <div>
                  <strong>Statistik Tentang:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                    {data.about?.aboutData?.map((ad) => (
                      <li key={ad.id} className="flex items-center gap-2">
                        {ad.label}: {ad.value}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setAboutItem({
                              id: ad.id,
                              aboutId: ad.aboutId,
                              label: ad.label,
                              value: ad.value,
                            })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Hapus item ini?")) {
                              dAboutData.mutate({ id: ad.id });
                            }
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Property */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian Properti
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPropertySec(
                        data.property ?? {
                          title: "",
                          subtitle: "",
                          buttonText: "",
                        }
                      )
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah Properti
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.property?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.property?.subtitle}
                </p>
                <p>
                  <strong>Tombol:</strong> {data.property?.buttonText}
                </p>
              </CardContent>
            </Card>

            {/* Why */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian Alasan
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setWhy(
                          data.why ?? {
                            title: "",
                            subtitle: "",
                            image: "",
                          }
                        )
                      }
                    >
                      <Edit className="h-4 w-4 mr-2" /> Ubah Alasan
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setWhyItem({
                          whyId: data.why?.id,
                          icon: "🏠",
                          title: "",
                          description: "",
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Tambah Alasan
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.why?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.why?.subtitle}
                </p>
                <p>
                  <strong>Gambar:</strong> {data.why?.image}
                </p>
                <div>
                  <strong>Data Alasan:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                    {data.why?.whyData?.map((wd) => (
                      <li key={wd.id} className="flex items-center gap-2">
                        {wd.icon} {wd.title} — {wd.description}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setWhyItem({
                              id: wd.id,
                              whyId: wd.whyId,
                              icon: wd.icon,
                              title: wd.title,
                              description: wd.description,
                            })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Hapus reason ini?")) {
                              dWhyData.mutate({ id: wd.id });
                            }
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian CTA
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCta(
                        data.cta ?? {
                          title: "",
                          subtitle: "",
                          buttonText: "",
                        }
                      )
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah CTA
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.cta?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.cta?.subtitle}
                </p>
                <p>
                  <strong>Tombol:</strong> {data.cta?.buttonText}
                </p>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian Layanan
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setServices(
                          data.service ?? {
                            title: "",
                            subtitle: "",
                          }
                        )
                      }
                    >
                      <Edit className="h-4 w-4 mr-2" /> Ubah Layanan
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setServiceItem({
                          servicesSectionId: data.service?.id,
                          icon: "🏘️",
                          title: "",
                          description: "",
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Tambah Layanan
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.service?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.service?.subtitle}
                </p>
                <div>
                  <strong>Data Layanan:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                    {data.service?.serviceData?.map((sd) => (
                      <li key={sd.id} className="flex items-center gap-2">
                        {sd.icon} {sd.title} — {sd.description}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setServiceItem({
                              id: sd.id,
                              servicesSectionId: sd.servicesSectionId,
                              icon: sd.icon,
                              title: sd.title,
                              description: sd.description,
                            })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Hapus service ini?")) {
                              dServiceData.mutate({ id: sd.id });
                            }
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian Testimoni
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setTestimonials(
                          data.testimonial ?? { title: "", subtitle: "" }
                        )
                      }
                    >
                      <Edit className="h-4 w-4 mr-2" /> Ubah Judul
                    </Button>
                    <Button
                      size="sm"
                      onClick={() =>
                        setTestimonialItem({
                          testimonialSectionId: data.testimonial?.id,
                          name: "",
                          role: "",
                          image: "",
                          rating: 5,
                          content: "",
                          urlVideo: "",
                        })
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Tambah Testimoni
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.testimonial?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.testimonial?.subtitle}
                </p>
                <div>
                  <strong>Item:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-gray-600">
                    {data.testimonial?.testimonialData?.map((t) => (
                      <li key={t.id} className="flex items-center gap-2">
                        {t.name} ({t.role}) — ★{t.rating} — {t.content}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setTestimonialItem({
                              id: t.id,
                              testimonialSectionId: t.testimonialSectionId,
                              name: t.name,
                              role: t.role,
                              image: t.image ?? "",
                              rating: t.rating ?? 5,
                              content: t.content,
                              urlVideo: t.urlVideo ?? "",
                            })
                          }
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm("Hapus testimonial ini?")) {
                              dTestimonialData.mutate({ id: t.id });
                            }
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Related Properties */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian Properti Terkait
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setRelated(
                        data.relatedProperty ?? {
                          title: "",
                          subtitle: "",
                          buttonText: "",
                        }
                      )
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah Properti Terkait
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.relatedProperty?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.relatedProperty?.subtitle}
                </p>
                <p>
                  <strong>Tombol:</strong> {data.relatedProperty?.buttonText}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* HALAMAN PROPERTI */}
          <TabsContent value="property-page" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Bagian Halaman Properti
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPropertyPage(
                        data.propertyPage ?? { title: "", subtitle: "" }
                      )
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah Halaman Properti
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Judul:</strong> {data.propertyPage?.title}
                </p>
                <p>
                  <strong>Subjudul:</strong> {data.propertyPage?.subtitle}
                </p>
              </CardContent>
            </Card>
            {/* Daftar Properti */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Daftar Properti
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() =>
                      setPropertyItem({
                        name: "",
                        images: [],
                        address: "",
                        type: $Enums.PropertyType.RUMAH,
                        room: 0,
                        bath: 0,
                        sqft: 0,
                        price: 0,
                        rating: 0,
                        description: "",
                        features: [],
                        isAvailable: true,
                      })
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Properti
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!(data.properties && data.properties.length) ? (
                  <p className="text-sm text-gray-600">
                    Belum ada data properti.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.properties.map((p) => (
                      <div
                        key={p.id}
                        className="border rounded-lg overflow-hidden bg-white"
                      >
                        <div className="h-40 bg-gray-100 overflow-hidden">
                          {p.images?.[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                              Tidak ada gambar
                            </div>
                          )}
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold leading-tight">
                              {p.name}
                            </h4>
                            <span
                              className={`px-2 py-0.5 rounded text-xs ${
                                p.isAvailable
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {p.isAvailable ? "Tersedia" : "Tidak Tersedia"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600">{p.address}</p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-700">
                            <Badge>{convertToTitleCase(p.type)}</Badge>
                            <Badge>{p.room} Kamar</Badge>
                            <Badge>{p.bath} K. Mandi</Badge>
                            <Badge>{p.sqft} sqft</Badge>
                            <Badge>{convertToIDR(p.price)}</Badge>
                            <Badge>★ {p.rating}</Badge>
                          </div>
                          {p.features?.length ? (
                            <p className="text-xs text-gray-600 line-clamp-2">
                              <span className="font-medium">Fitur:</span>{" "}
                              {p.features.join(", ")}
                            </p>
                          ) : null}
                          <div className="flex gap-2 pt-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setPropertyItem({ ...p })}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Ubah
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                if (confirm(`Hapus properti “${p.name}”?`)) {
                                  dPropertyItem.mutate({ id: p.id });
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Hapus
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* MEREK */}
          <TabsContent value="branding" className="space-y-6">
            {/* Logo */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Informasi Logo
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setLogo(
                        data.logo ?? {
                          name: "",
                          logo: "",
                          alt: "",
                        }
                      )
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah Logo
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Nama:</strong> {data.logo?.name}
                </p>
                <p>
                  <strong>URL Logo:</strong> {data.logo?.logo}
                </p>
                <p>
                  <strong>Teks Alt:</strong> {data.logo?.alt}
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Informasi Kontak
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setContact(
                        data.contact ?? { address: "", phone: "", email: "" }
                      )
                    }
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah Kontak
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Alamat:</strong> {data.contact?.address}
                </p>
                <p>
                  <strong>Telepon:</strong> {data.contact?.phone}
                </p>
                <p>
                  <strong>Email:</strong> {data.contact?.email}
                </p>
              </CardContent>
            </Card>

            {/* Copyright */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Informasi Hak Cipta
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCopyright(data.copyright ?? { text: "" })}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Ubah Hak Cipta
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Teks:</strong> {data.copyright?.text}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SOSIAL */}
          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Tautan Media Sosial
                  <Button
                    onClick={() =>
                      setSocialItem({
                        rootId: data.id,
                        icon: "FACEBOOK",
                        href: "",
                        label: "",
                      })
                    }
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Plus className="h-4 w-4" />
                    Tambah Tautan Sosial
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.socialMedia?.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        {s.icon} — {s.label}
                      </p>
                      <p className="text-sm text-gray-600">{s.href}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setSocialItem({
                            id: s.id,
                            rootId: s.rootId,
                            icon: s.icon,
                            href: s.href,
                            label: s.label,
                          })
                        }
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (confirm("Hapus social link ini?")) {
                            dSocial.mutate({ id: s.id });
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* ==================== MODALS ==================== */}

      {/* Hero */}
      {hero && (
        <Modal title="Ubah Hero">
          <Field label="Judul">
            <Input
              value={hero.title}
              onChange={(e) => setHero({ ...hero, title: e.target.value })}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={4}
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
            />
          </Field>
          <Field label="Teks Tombol">
            <Input
              value={hero.buttonText}
              onChange={(e) => setHero({ ...hero, buttonText: e.target.value })}
            />
          </Field>
          <Field label="Gambar Latar">
            <FileUpload
              value={hero.image || ""}
              onChange={(v) => setHero({ ...hero, image: v })}
              accept="image/*"
            />
          </Field>
          <Actions
            saving={mHero.isPending}
            onSave={() => mHero.mutate({ id: data.hero?.id, ...hero })}
            onCancel={() => setHero(null)}
          />
        </Modal>
      )}

      {/* About */}
      {about && (
        <Modal title="Ubah Tentang">
          <Field label="Judul">
            <Input
              value={about.title}
              onChange={(e) => setAbout({ ...about, title: e.target.value })}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={about.subtitle}
              onChange={(e) => setAbout({ ...about, subtitle: e.target.value })}
            />
          </Field>
          <Field label="Deskripsi">
            <Textarea
              rows={6}
              value={about.description}
              onChange={(e) =>
                setAbout({ ...about, description: e.target.value })
              }
            />
          </Field>
          <Field label="Gambar">
            <FileUpload
              value={about.image || ""}
              onChange={(v) => setAbout({ ...about, image: v })}
            />
          </Field>
          <Actions
            saving={mAbout.isPending}
            onSave={() => mAbout.mutate({ id: data.about?.id, ...about })}
            onCancel={() => setAbout(null)}
          />
        </Modal>
      )}

      {/* AboutData item */}
      {aboutItem && (
        <Modal title={aboutItem.id ? "Ubah Statistik" : "Tambah Statistik"}>
          <Field label="Label">
            <Input
              value={aboutItem.label}
              onChange={(e) =>
                setAboutItem({ ...aboutItem, label: e.target.value })
              }
            />
          </Field>
          <Field label="Nilai">
            <Input
              value={aboutItem.value}
              onChange={(e) =>
                setAboutItem({ ...aboutItem, value: e.target.value })
              }
            />
          </Field>
          {/* Delete di modal (jika sudah ada id) */}
          {aboutItem.id && (
            <div className="flex">
              <Button
                variant="destructive"
                className="ml-auto"
                onClick={() => {
                  if (confirm("Hapus item ini?")) {
                    dAboutData.mutate({ id: aboutItem.id });
                    setAboutItem(null);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </div>
          )}
          <Actions
            saving={mAboutData.isPending}
            onSave={() =>
              mAboutData.mutate({
                id: aboutItem.id,
                aboutId: aboutItem.aboutId ?? data.about?.id,
                label: aboutItem.label,
                value: aboutItem.value,
              })
            }
            onCancel={() => setAboutItem(null)}
          />
        </Modal>
      )}

      {/* Property Section */}
      {propertySec && (
        <Modal title="Ubah Bagian Properti">
          <Field label="Judul">
            <Input
              value={propertySec.title}
              onChange={(e) =>
                setPropertySec({ ...propertySec, title: e.target.value })
              }
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={propertySec.subtitle}
              onChange={(e) =>
                setPropertySec({ ...propertySec, subtitle: e.target.value })
              }
            />
          </Field>
          <Field label="Teks Tombol">
            <Input
              value={propertySec.buttonText}
              onChange={(e) =>
                setPropertySec({ ...propertySec, buttonText: e.target.value })
              }
            />
          </Field>
          <Actions
            saving={mProperty.isPending}
            onSave={() =>
              mProperty.mutate({ id: data.property?.id, ...propertySec })
            }
            onCancel={() => setPropertySec(null)}
          />
        </Modal>
      )}

      {/* Why */}
      {why && (
        <Modal title="Ubah Bagian Alasan">
          <Field label="Judul">
            <Input
              value={why.title}
              onChange={(e) => setWhy({ ...why, title: e.target.value })}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={why.subtitle}
              onChange={(e) => setWhy({ ...why, subtitle: e.target.value })}
            />
          </Field>
          <Field label="Gambar">
            <FileUpload
              value={why.image || ""}
              onChange={(v) => setWhy({ ...why, image: v })}
              accept="image/*"
            />
          </Field>
          <Actions
            saving={mWhy.isPending}
            onSave={() => mWhy.mutate({ id: data.why?.id, ...why })}
            onCancel={() => setWhy(null)}
          />
        </Modal>
      )}

      {/* WhyData item */}
      {whyItem && (
        <Modal title={whyItem.id ? "Ubah Alasan" : "Tambah Alasan"}>
          <Field label="Ikon (emoji/teks)">
            <Input
              value={whyItem.icon}
              onChange={(e) => setWhyItem({ ...whyItem, icon: e.target.value })}
            />
          </Field>
          <Field label="Judul">
            <Input
              value={whyItem.title}
              onChange={(e) =>
                setWhyItem({ ...whyItem, title: e.target.value })
              }
            />
          </Field>
          <Field label="Deskripsi">
            <Textarea
              rows={4}
              value={whyItem.description}
              onChange={(e) =>
                setWhyItem({ ...whyItem, description: e.target.value })
              }
            />
          </Field>
          {whyItem.id && (
            <div className="flex">
              <Button
                variant="destructive"
                className="ml-auto"
                onClick={() => {
                  if (confirm("Hapus reason ini?")) {
                    dWhyData.mutate({ id: whyItem.id });
                    setWhyItem(null);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </div>
          )}
          <Actions
            saving={mWhyData.isPending}
            onSave={() =>
              mWhyData.mutate({
                id: whyItem.id,
                whyId: whyItem.whyId ?? data.why?.id,
                icon: whyItem.icon,
                title: whyItem.title,
                description: whyItem.description,
              })
            }
            onCancel={() => setWhyItem(null)}
          />
        </Modal>
      )}

      {/* CTA */}
      {cta && (
        <Modal title="Ubah CTA">
          <Field label="Judul">
            <Input
              value={cta.title}
              onChange={(e) => setCta({ ...cta, title: e.target.value })}
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={cta.subtitle}
              onChange={(e) => setCta({ ...cta, subtitle: e.target.value })}
            />
          </Field>
          <Field label="Teks Tombol">
            <Input
              value={cta.buttonText}
              onChange={(e) => setCta({ ...cta, buttonText: e.target.value })}
            />
          </Field>
          <Actions
            saving={mCTA.isPending}
            onSave={() => mCTA.mutate({ id: data.cta?.id, ...cta })}
            onCancel={() => setCta(null)}
          />
        </Modal>
      )}

      {/* Services */}
      {services && (
        <Modal title="Ubah Layanan">
          <Field label="Judul">
            <Input
              value={services.title}
              onChange={(e) =>
                setServices({ ...services, title: e.target.value })
              }
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={services.subtitle}
              onChange={(e) =>
                setServices({ ...services, subtitle: e.target.value })
              }
            />
          </Field>
          <Actions
            saving={mServices.isPending}
            onSave={() =>
              mServices.mutate({ id: data.service?.id, ...services })
            }
            onCancel={() => setServices(null)}
          />
        </Modal>
      )}

      {/* ServiceData item */}
      {serviceItem && (
        <Modal title={serviceItem.id ? "Ubah Layanan" : "Tambah Layanan"}>
          <Field label="Ikon (emoji/teks)">
            <Input
              value={serviceItem.icon}
              onChange={(e) =>
                setServiceItem({ ...serviceItem, icon: e.target.value })
              }
            />
          </Field>
          <Field label="Judul">
            <Input
              value={serviceItem.title}
              onChange={(e) =>
                setServiceItem({ ...serviceItem, title: e.target.value })
              }
            />
          </Field>
          <Field label="Deskripsi">
            <Textarea
              rows={4}
              value={serviceItem.description}
              onChange={(e) =>
                setServiceItem({
                  ...serviceItem,
                  description: e.target.value,
                })
              }
            />
          </Field>
          {serviceItem.id && (
            <div className="flex">
              <Button
                variant="destructive"
                className="ml-auto"
                onClick={() => {
                  if (confirm("Hapus service ini?")) {
                    dServiceData.mutate({ id: serviceItem.id });
                    setServiceItem(null);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </div>
          )}
          <Actions
            saving={mServiceData.isPending}
            onSave={() =>
              mServiceData.mutate({
                id: serviceItem.id,
                servicesSectionId:
                  serviceItem.servicesSectionId ?? data.service?.id,
                icon: serviceItem.icon,
                title: serviceItem.title,
                description: serviceItem.description,
              })
            }
            onCancel={() => setServiceItem(null)}
          />
        </Modal>
      )}

      {/* Testimonials headline */}
      {testimonials && (
        <Modal title="Ubah Judul Testimoni">
          <Field label="Judul">
            <Input
              value={testimonials.title}
              onChange={(e) =>
                setTestimonials({ ...testimonials, title: e.target.value })
              }
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={testimonials.subtitle}
              onChange={(e) =>
                setTestimonials({ ...testimonials, subtitle: e.target.value })
              }
            />
          </Field>
          <Actions
            saving={mTestimonials.isPending}
            onSave={() =>
              mTestimonials.mutate({
                id: data.testimonial?.id,
                ...testimonials,
              })
            }
            onCancel={() => setTestimonials(null)}
          />
        </Modal>
      )}

      {/* TestimonialData item */}
      {testimonialItem && (
        <Modal
          title={testimonialItem.id ? "Ubah Testimoni" : "Tambah Testimoni"}
        >
          <Field label="Nama">
            <Input
              value={testimonialItem.name}
              onChange={(e) =>
                setTestimonialItem({ ...testimonialItem, name: e.target.value })
              }
            />
          </Field>
          <Field label="Peran">
            <Input
              value={testimonialItem.role}
              onChange={(e) =>
                setTestimonialItem({ ...testimonialItem, role: e.target.value })
              }
            />
          </Field>
          <Field label="Penilaian (1–5)">
            <Input
              type="number"
              min={1}
              max={5}
              value={testimonialItem.rating}
              onChange={(e) =>
                setTestimonialItem({
                  ...testimonialItem,
                  rating: Number(e.target.value) || 5,
                })
              }
            />
          </Field>
          <Field label="Konten">
            <Textarea
              rows={4}
              value={testimonialItem.content}
              onChange={(e) =>
                setTestimonialItem({
                  ...testimonialItem,
                  content: e.target.value,
                })
              }
            />
          </Field>
          <Field label="Gambar (opsional)">
            <FileUpload
              value={testimonialItem.image || ""}
              onChange={(v) =>
                setTestimonialItem({ ...testimonialItem, image: v })
              }
              accept="image/*"
            />
          </Field>
          <Field label="URL Embed YouTube (opsional)">
            <Input
              value={testimonialItem.urlVideo || ""}
              onChange={(e) =>
                setTestimonialItem({
                  ...testimonialItem,
                  urlVideo: e.target.value,
                })
              }
            />
          </Field>
          {testimonialItem.id && (
            <div className="flex">
              <Button
                variant="destructive"
                className="ml-auto"
                onClick={() => {
                  if (confirm("Hapus testimonial ini?")) {
                    dTestimonialData.mutate({ id: testimonialItem.id });
                    setTestimonialItem(null);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </div>
          )}
          <Actions
            saving={mTestimonialData.isPending}
            onSave={() =>
              mTestimonialData.mutate({
                id: testimonialItem.id,
                testimonialSectionId:
                  testimonialItem.testimonialSectionId ?? data.testimonial?.id,
                name: testimonialItem.name,
                role: testimonialItem.role,
                image: testimonialItem.image || null,
                rating: testimonialItem.rating,
                content: testimonialItem.content,
                urlVideo: testimonialItem.urlVideo || null,
              })
            }
            onCancel={() => setTestimonialItem(null)}
          />
        </Modal>
      )}

      {/* Related */}
      {related && (
        <Modal title="Ubah Bagian Properti Terkait">
          <Field label="Judul">
            <Input
              value={related.title}
              onChange={(e) =>
                setRelated({ ...related, title: e.target.value })
              }
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={related.subtitle}
              onChange={(e) =>
                setRelated({ ...related, subtitle: e.target.value })
              }
            />
          </Field>
          <Field label="Teks Tombol">
            <Input
              value={related.buttonText}
              onChange={(e) =>
                setRelated({ ...related, buttonText: e.target.value })
              }
            />
          </Field>
          <Actions
            saving={mRelated.isPending}
            onSave={() =>
              mRelated.mutate({ id: data.relatedProperty?.id, ...related })
            }
            onCancel={() => setRelated(null)}
          />
        </Modal>
      )}

      {/* Final CTA */}
      {finalCta && (
        <Modal title="Ubah CTA Terakhir">
          <Field label="Judul">
            <Input
              value={finalCta.title}
              onChange={(e) =>
                setFinalCta({ ...finalCta, title: e.target.value })
              }
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={finalCta.subtitle}
              onChange={(e) =>
                setFinalCta({ ...finalCta, subtitle: e.target.value })
              }
            />
          </Field>
          <Field label="Tombol Utama">
            <Input
              value={finalCta.primaryButtonText}
              onChange={(e) =>
                setFinalCta({
                  ...finalCta,
                  primaryButtonText: e.target.value,
                })
              }
            />
          </Field>
          <Field label="Tombol Sekunder">
            <Input
              value={finalCta.secondaryButtonText}
              onChange={(e) =>
                setFinalCta({
                  ...finalCta,
                  secondaryButtonText: e.target.value,
                })
              }
            />
          </Field>
          <Actions
            saving={mFinalCTA.isPending}
            onSave={() =>
              mFinalCTA.mutate({ id: data.finalCtaSection?.id, ...finalCta })
            }
            onCancel={() => setFinalCta(null)}
          />
        </Modal>
      )}

      {/* Property Page */}
      {propertyPage && (
        <Modal title="Ubah Bagian Halaman Properti">
          <Field label="Judul">
            <Input
              value={propertyPage.title}
              onChange={(e) =>
                setPropertyPage({ ...propertyPage, title: e.target.value })
              }
            />
          </Field>
          <Field label="Subjudul">
            <Textarea
              rows={3}
              value={propertyPage.subtitle}
              onChange={(e) =>
                setPropertyPage({ ...propertyPage, subtitle: e.target.value })
              }
            />
          </Field>
          <Field label="CTA Title">
            <Input
              value={propertyPage.ctaTitle}
              onChange={(e) =>
                setPropertyPage({ ...propertyPage, ctaTitle: e.target.value })
              }
            />
          </Field>
          <Field label="CTA Subtitle">
            <Textarea
              rows={3}
              value={propertyPage.ctaSubtitle}
              onChange={(e) =>
                setPropertyPage({
                  ...propertyPage,
                  ctaSubtitle: e.target.value,
                })
              }
            />
          </Field>
          <Field label="CTA Button Text">
            <Input
              value={propertyPage.ctaButtonText}
              onChange={(e) =>
                setPropertyPage({
                  ...propertyPage,
                  ctaButtonText: e.target.value,
                })
              }
            />
          </Field>
          <Actions
            saving={mPropertyPage.isPending}
            onSave={() =>
              mPropertyPage.mutate({
                id: data.propertyPage?.id,
                ...propertyPage,
              })
            }
            onCancel={() => setPropertyPage(null)}
          />
        </Modal>
      )}

      {/* Logo */}
      {logo && (
        <Modal title="Ubah Logo">
          <Field label="Nama">
            <Input
              value={logo.name}
              onChange={(e) => setLogo({ ...logo, name: e.target.value })}
            />
          </Field>
          <Field label="URL Logo">
            <FileUpload
              value={logo.logo || ""}
              onChange={(v) => setLogo({ ...logo, logo: v })}
              accept="image/*"
            />
          </Field>
          <Field label="Teks Alt">
            <Input
              value={logo.alt}
              onChange={(e) => setLogo({ ...logo, alt: e.target.value })}
            />
          </Field>
          <Actions
            saving={mLogo.isPending}
            onSave={() => mLogo.mutate({ id: data.logo?.id, ...logo })}
            onCancel={() => setLogo(null)}
          />
        </Modal>
      )}

      {/* Contact */}
      {contact && (
        <Modal title="Ubah Kontak">
          <Field label="Alamat">
            <Textarea
              rows={3}
              value={contact.address}
              onChange={(e) =>
                setContact({ ...contact, address: e.target.value })
              }
            />
          </Field>
          <Field label="Telepon">
            <Input
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
            />
          </Field>
          <Actions
            saving={mContact.isPending}
            onSave={() => mContact.mutate({ id: data.contact?.id, ...contact })}
            onCancel={() => setContact(null)}
          />
        </Modal>
      )}

      {/* Copyright */}
      {copyright && (
        <Modal title="Ubah Hak Cipta">
          <Field label="Teks">
            <Input
              value={copyright.text}
              onChange={(e) =>
                setCopyright({ ...copyright, text: e.target.value })
              }
            />
          </Field>
          <Actions
            saving={mCopyright.isPending}
            onSave={() =>
              mCopyright.mutate({ id: data.copyright?.id, ...copyright })
            }
            onCancel={() => setCopyright(null)}
          />
        </Modal>
      )}

      {/* Property Item */}
      {propertyItem && (
        <Modal title={propertyItem.id ? "Ubah Properti" : "Tambah Properti"}>
          <Field label="Nama Properti">
            <Input
              value={propertyItem.name || ""}
              onChange={(e) =>
                setPropertyItem({ ...propertyItem, name: e.target.value })
              }
            />
          </Field>

          <Field label="Alamat">
            <Input
              value={propertyItem.address || ""}
              onChange={(e) =>
                setPropertyItem({ ...propertyItem, address: e.target.value })
              }
            />
          </Field>

          <Field label="Tipe Properti">
            <select
              className="w-full border rounded px-3 py-2 bg-white text-sm"
              value={propertyItem.type || $Enums.PropertyType.RUMAH}
              onChange={(e) =>
                setPropertyItem({
                  ...propertyItem,
                  type: e.target.value as $Enums.PropertyType,
                })
              }
            >
              {Object.values($Enums.PropertyType).map((t) => (
                <option key={t} value={t}>
                  {convertToTitleCase(t)}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Katalog">
            <FileUpload
              value={propertyItem.pdf || ""}
              onChange={(v) => setPropertyItem({ ...propertyItem, pdf: v })}
              accept="application/pdf"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Kamar">
              <Input
                type="number"
                min={0}
                value={propertyItem.room ?? ""}
                onChange={(e) =>
                  setPropertyItem({
                    ...propertyItem,
                    room:
                      e.target.value === ""
                        ? undefined
                        : parseInt(e.target.value),
                  })
                }
              />
            </Field>
            <Field label="Kamar Mandi">
              <Input
                type="number"
                min={0}
                value={propertyItem.bath ?? ""}
                onChange={(e) =>
                  setPropertyItem({
                    ...propertyItem,
                    bath:
                      e.target.value === ""
                        ? undefined
                        : parseInt(e.target.value),
                  })
                }
              />
            </Field>
            <Field label="Luas (sqft)">
              <Input
                type="number"
                min={0}
                value={propertyItem.sqft ?? ""}
                onChange={(e) =>
                  setPropertyItem({
                    ...propertyItem,
                    sqft:
                      e.target.value === ""
                        ? undefined
                        : parseInt(e.target.value),
                  })
                }
              />
            </Field>
            <Field label="Harga (Rp)">
              <Input
                type="number"
                min={0}
                value={propertyItem.price ?? ""}
                onChange={(e) =>
                  setPropertyItem({
                    ...propertyItem,
                    price:
                      e.target.value === ""
                        ? undefined
                        : parseInt(e.target.value),
                  })
                }
              />
            </Field>
            <Field label="Rating (0–5)">
              <Input
                type="number"
                min={0}
                max={5}
                step={0.1}
                value={propertyItem.rating ?? ""}
                onChange={(e) =>
                  setPropertyItem({
                    ...propertyItem,
                    rating:
                      e.target.value === ""
                        ? undefined
                        : parseFloat(e.target.value),
                  })
                }
              />
            </Field>
            <Field label="Tersedia" className="flex flex-col">
              <Switch
                checked={!!propertyItem.isAvailable}
                onCheckedChange={(checked) =>
                  setPropertyItem({ ...propertyItem, isAvailable: checked })
                }
              />
            </Field>
          </div>

          <Field label="URL Gambar (multi)">
            <MultiFileUpload
              value={propertyItem.images || []}
              onChange={(arr) =>
                setPropertyItem({ ...propertyItem, images: arr })
              }
              accept="image/*"
              maxSizeMB={5}
              maxCount={12}
            />
          </Field>

          <Field label="Fitur (multi)">
            <TagInput
              value={propertyItem.features || []}
              placeholder="Tulis fitur, tekan Enter"
              onChange={(arr) =>
                setPropertyItem({ ...propertyItem, features: arr })
              }
            />
          </Field>

          <Field label="Deskripsi">
            <Textarea
              rows={5}
              value={propertyItem.description || ""}
              onChange={(e) =>
                setPropertyItem({
                  ...propertyItem,
                  description: e.target.value,
                })
              }
            />
          </Field>

          {/* Tombol hapus di dalam modal saat edit */}
          {propertyItem.id && (
            <div className="flex">
              <Button
                variant="destructive"
                className="ml-auto"
                onClick={() => {
                  if (confirm("Hapus properti ini?")) {
                    dPropertyItem.mutate({ id: propertyItem.id });
                    setPropertyItem(null);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </div>
          )}

          <Actions
            saving={mPropertyItem.isPending}
            onSave={() =>
              mPropertyItem.mutate({
                id: propertyItem.id,
                name: propertyItem.name,
                images: propertyItem.images,
                address: propertyItem.address,
                type: propertyItem.type,
                room: propertyItem.room,
                bath: propertyItem.bath,
                sqft: propertyItem.sqft,
                price: propertyItem.price,
                rating: propertyItem.rating,
                description: propertyItem.description,
                features: propertyItem.features,
                isAvailable: !!propertyItem.isAvailable,
                pdf: propertyItem.pdf,
              })
            }
            onCancel={() => setPropertyItem(null)}
          />
        </Modal>
      )}

      {/* Social item */}
      {socialItem && (
        <Modal
          title={socialItem.id ? "Ubah Tautan Sosial" : "Tambah Tautan Sosial"}
        >
          <Field label="Ikon">
            <select
              className="w-full border rounded px-3 py-2 bg-white text-sm"
              value={socialItem.icon}
              onChange={(e) =>
                setSocialItem({
                  ...socialItem,
                  icon: e.target.value as $Enums.SocialMediaIcon,
                })
              }
            >
              {Object.values($Enums.SocialMediaIcon).map((opt) => (
                <option key={opt} value={opt}>
                  {opt[0].toUpperCase() + opt.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Label">
            <Input
              value={socialItem.label}
              onChange={(e) =>
                setSocialItem({ ...socialItem, label: e.target.value })
              }
            />
          </Field>
          <Field label="URL">
            <Input
              value={socialItem.href}
              onChange={(e) =>
                setSocialItem({ ...socialItem, href: e.target.value })
              }
            />
          </Field>
          {socialItem.id && (
            <div className="flex">
              <Button
                variant="destructive"
                className="ml-auto"
                onClick={() => {
                  if (confirm("Hapus social link ini?")) {
                    dSocial.mutate({ id: socialItem.id });
                    setSocialItem(null);
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Hapus
              </Button>
            </div>
          )}
          <Actions
            saving={mSocial.isPending}
            onSave={() =>
              mSocial.mutate({
                id: socialItem.id,
                rootId: socialItem.rootId ?? data.id,
                icon: socialItem.icon,
                label: socialItem.label,
                href: socialItem.href,
              })
            }
            onCancel={() => setSocialItem(null)}
          />
        </Modal>
      )}
    </div>
  );
};

/* ---------------------- Small UI primitives ---------------------- */
function Modal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">{children}</CardContent>
      </Card>
    </div>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}

function Actions({
  saving,
  onSave,
  onCancel,
}: {
  saving?: boolean;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex gap-2 pt-2">
      <Button
        onClick={onSave}
        disabled={saving}
        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Save className="h-4 w-4 mr-2" />
        {saving ? "Menyimpan..." : "Simpan"}
      </Button>
      <Button
        variant="outline"
        onClick={onCancel}
        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
      >
        <X className="h-4 w-4 mr-2" />
        Tutup
      </Button>
    </div>
  );
}

function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState("");

  const add = (raw: string) => {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (!parts.length) return;
    const set = new Set([...(value || []), ...parts]);
    onChange(Array.from(set));
    setText("");
  };

  const remove = (idx: number) => {
    const arr = [...value];
    arr.splice(idx, 1);
    onChange(arr);
  };

  return (
    <div className="rounded border p-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {value?.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded"
          >
            {t}
            <button
              type="button"
              className="text-blue-700/70 hover:text-blue-900"
              onClick={() => remove(i)}
              aria-label={`Hapus ${t}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <Input
        value={text}
        placeholder={placeholder || "Ketik lalu Enter"}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add(text);
          }
        }}
        onBlur={() => {
          if (text.trim()) add(text);
        }}
      />
    </div>
  );
}

export default withAuth(AdminPage);
