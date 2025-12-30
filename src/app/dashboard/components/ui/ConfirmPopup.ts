// components/ui/ConfirmPopup.ts

import Swal from "sweetalert2";

interface ConfirmPopupOptions {
  title?: string;
  text?: string;
  html?: string;
  itemName?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  icon?: "warning" | "error" | "success" | "info" | "question";
  showCancelButton?: boolean;
  loadingText?: string;
}

/**
 * Popup de confirmation global réutilisable avec SweetAlert2
 * @returns Promise<boolean> - true si confirmé, false si annulé
 */
export const confirmPopup = async ({
  title = "Confirmer l'action ?",
  text,
  html,
  itemName,
  confirmButtonText = "Confirmer",
  cancelButtonText = "Annuler",
  icon = "warning",
  showCancelButton = true,
  loadingText = "Traitement en cours...",
}: ConfirmPopupOptions = {}): Promise<boolean> => {
  let fullHtml = html || text || "";

  if (itemName) {
    fullHtml += `<p class="font-bold text-lg mt-3">${itemName}</p>`;
  }

  fullHtml += `<p class="text-sm text-gray-600 mt-3">Cette action est <strong>irréversible</strong>.</p>`;

  const result = await Swal.fire({
    title,
    html: fullHtml || undefined,
    text: !fullHtml ? text : undefined,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    buttonsStyling: false,
    customClass: {
      popup: "swal-global-popup",
      confirmButton: "swal-global-confirm",
      cancelButton: "swal-global-cancel",
    },
    preConfirm: () => {
      Swal.showLoading();
      Swal.getConfirmButton()?.setAttribute("disabled", "true");
    },
  });

  return result.isConfirmed;
};

/**
 * Popup de chargement global
 */
export const showLoadingPopup = (text: string = "Traitement en cours...") => {
  Swal.fire({
    title: text,
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

/**
 * Popup de succès
 */
export const showSuccessPopup = (title: string = "Succès !", text?: string) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  });
};

/**
 * Popup d'erreur
 */
export const showErrorPopup = (title: string = "Erreur", text?: string) => {
  Swal.fire({
    title,
    text,
    icon: "error",
  });
};