import { Candidate, SimulationStep } from '../types';

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 1,
    number: '1',
    name: 'CALON SIMULASI 01',
    label: 'CALON FIKTIF',
    isRealCandidate: false,
    gender: 'male',
  },
  {
    id: 2,
    number: '2',
    name: 'DEDENG EFENDI',
    label: 'FOTO KANDIDAT REFERENSI',
    isRealCandidate: true,
    imageSrc: '/assets/dedeng-efendi.png',
  },
  {
    id: 3,
    number: '3',
    name: 'CALON SIMULASI 03',
    label: 'CALON FIKTIF',
    isRealCandidate: false,
    gender: 'male',
  },
];

export const SIMULATION_STEPS: SimulationStep[] = [
  {
    step: 1,
    shortTitle: 'Datang ke TPS',
    title: 'LANGKAH 1 — DATANG KE TEMPAT PEMUNGUTAN SUARA (TPS)',
    subtitle: 'Kehadiran Pemilih di TPS Desa Kadakajaya, Kec. Tanjungsari',
    description:
      'Warga pemilih hadir di lokasi TPS Desa Kadakajaya pada waktu yang telah ditetapkan dengan membawa Surat Pemberitahuan Memilih (Model C) dan e-KTP untuk mengantre di meja petugas KPPS.',
    voiceGuide:
      'Langkah pertama: Selamat datang di Tempat Pemungutan Suara Desa Kadakajaya, Kecamatan Tanjungsari. Silakan hadir tepat waktu dengan membawa surat undangan pemilih dan KTP elektronik. Klik tombol Mulai Praktik untuk melanjutkan.',
  },
  {
    step: 2,
    shortTitle: 'Verifikasi Data',
    title: 'LANGKAH 2 — VERIFIKASI DATA OLEH PETUGAS KPPS',
    subtitle: 'Pencocokan Data Pemilih dalam DPT Desa Kadakajaya',
    description:
      'Petugas KPPS mencocokkan identitas pemilih dalam sistem Daftar Pemilih Tetap (DPT) Desa Kadakajaya untuk memastikan hak pilih aktif dan mencegah duplikasi hak pilih.',
    voiceGuide:
      'Langkah kedua: Petugas KPPS memeriksa nama Anda dalam daftar pemilih tetap. Pada simulasi ini, Anda terdaftar sebagai Warga Simulasi 0 0 1. Klik tombol Simulasikan Verifikasi.',
  },
  {
    step: 3,
    shortTitle: 'Menuju Bilik',
    title: 'LANGKAH 3 — MENUJU BILIK SUARA E-VOTE',
    subtitle: 'Menjaga Asas LUBER JURDIL di Bilik Suara',
    description:
      'Setelah verifikasi berhasil, pemilih dipersilakan menuju bilik suara e-vote yang tertutup dan terjaga kerahasiaannya. Ikuti arahan petugas dengan tertib.',
    voiceGuide:
      'Langkah ketiga: Silakan melangkah menuju bilik suara e-vote. Pastikan Anda masuk sendiri tanpa didampingi orang lain demi menjaga kerahasiaan pilihan. Klik tombol Saya Siap.',
  },
  {
    step: 4,
    shortTitle: 'Scan QR Code',
    title: 'LANGKAH 4 — PEMINDAIAN QR CODE SIMULASI',
    subtitle: 'Aktivasi Layar Sentuh Perangkat Pemilihan E-Vote',
    description:
      'Di bilik suara, arahkan QR Code simulasi ke sensor pemindai perangkat e-vote untuk mengaktifkan surat suara elektronik pada layar sentuh.',
    voiceGuide:
      'Langkah keempat: Pindai kode Q R token Anda pada sensor di depan mesin e-vote. Ini akan mengaktifkan layar surat suara elektronik. Klik tombol Pindai Q R Contoh.',
  },
  {
    step: 5,
    shortTitle: 'Pilih Calon',
    title: 'LANGKAH 5 — MEMILIH SATU DARI TIGA CALON',
    subtitle: 'Sentuh Kartu Calon Pilihan Anda pada Layar Sentuh',
    description:
      'Layar akan menampilkan tiga kartu calon dengan tata letak seragam. Sentuh salah satu kartu calon untuk menentukan pilihan Anda secara mantap.',
    voiceGuide:
      'Langkah kelima: Di layar sentuh, pilih satu calon dengan menyentuh kartu calon nomor 1, 2, atau 3. Calon yang dipilih akan diberi tanda centang. Setelah memilih, klik tombol Lanjutkan.',
  },
  {
    step: 6,
    shortTitle: 'Konfirmasi',
    title: 'LANGKAH 6 — KONFIRMASI PILIHAN SUARA ANDA',
    subtitle: 'Tinjau Kembali Pilihan Sebelum Disimpan pada Perangkat',
    description:
      'Sistem akan menampilkan ringkasan calon yang dipilih. Jika ingin mengubah pilihan, tekan "Ubah Pilihan". Jika sudah yakin, tekan "Konfirmasi Simulasi".',
    voiceGuide:
      'Langkah keenam: Periksa kembali calon yang telah Anda pilih. Jika ingin mengganti, klik Ubah Pilihan. Jika sudah yakin dan benar, klik tombol Konfirmasi Simulasi.',
  },
  {
    step: 7,
    shortTitle: 'Selesai',
    title: 'LANGKAH 7 — STATUS SIMULASI BERHASIL DISELESAIKAN',
    subtitle: 'Pilihan Selesai Diproses Secara Elektronik',
    description:
      'Simulasi pilihan telah berhasil diselesaikan pada perangkat. Peringatan: ini hanya latihan sosialisasi, data tidak dikirim ke server resmi.',
    voiceGuide:
      'Langkah ketujuh: Simulasi berhasil diselesaikan. Ingat, ini hanya latihan sosialisasi dan pilihan tidak dikirim ke server resmi.',
  },
  {
    step: 8,
    shortTitle: 'Ambil Struk',
    title: 'LANGKAH 8 — PANDUAN STRUK SIMULASI DAN KOTAK AUDIT',
    subtitle: 'Penyelesaian Prosedur E-Vote Sesuai SOP Resmi',
    description:
      'Mesin e-vote mencetak struk fisik (audit trail kertas). Pemilih mengambil struk dan memasukkannya ke dalam kotak audit fisik di depan bilik suara sesuai arahan petugas.',
    voiceGuide:
      'Langkah kedelapan: Mesin mencetak struk fisik bukti pemilihan. Pada pemilihan resmi, masukkan struk ke dalam kotak audit fisik sesuai arahan petugas. Anda telah menyelesaikan seluruh rangkaian simulasi.',
  },
];

export const FAQS = [
  {
    q: 'Apa tujuan simulasi e-vote ini di Desa Kadakajaya?',
    a: 'Simulasi ini diselenggarakan sebagai media edukasi dan sosialisasi kepada seluruh warga pemilih Desa Kadakajaya, Kecamatan Tanjungsari, Kabupaten Sumedang (Periode 2026–2034) agar memahami dan siap menggunakan perangkat e-voting.',
  },
  {
    q: 'Mengapa Calon Nomor 2 adalah DEDENG EFENDI?',
    a: 'Calon nomor 2 menggunakan foto asli dan identitas kandidat referensi, didampingi dua calon simulasi fiktif (nomor 1 dan nomor 3) untuk memberikan gambaran realistis layar sentuh TPS.',
  },
  {
    q: 'Apakah pilihan saya tersimpan atau dikirim ke internet?',
    a: 'TIDAK SAMA SEKALI. Aplikasi ini 100% berjalan lokal di browser (client-side). Tidak ada database, backend, cookie pelacak, atau pengiriman data politik ke pihak mana pun.',
  },
  {
    q: 'Apa fungsi struk fisik pada mesin e-vote?',
    a: 'Struk kertas (Paper Audit Trail) dicetak otomatis sebagai bukti fisik untuk verifikasi silang (audit manual) dan dimasukkan ke kotak audit transparan di TPS.',
  },
];
